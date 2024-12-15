/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import DashBoardComponent from '../components/Dashboard';
import { useNavigate } from 'react-router-dom';  
import moment from 'moment';

const DashBoard = () => {
  const navigate = useNavigate();  
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [currentDayId, setCurrentDayId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [waterIntake, setWaterIntake] = useState(0);
  const [nutritionPoints, setNutritionPoints] = useState(0);
  const [exerciseMins, setExerciseMins] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const todaysDate = moment().format('MM.DD.YYYY');

  const totalExerciseMinutes = (arr) => {
    return arr.reduce((total, activity) => total + activity.duration, 0);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/health/user/${userId}`;
        const token = localStorage.getItem('jwtToken');
        
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }

        const user = await res.json();
        
        let mostRecentDate = user.days?.length
          ? moment(user.days[0].date).format('MM.DD.YYYY')
          : moment().add(-1, 'days').format('MM.DD.YYYY');

        if (mostRecentDate === todaysDate) {
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setWaterIntake(user.days[0]?.water || 0);
          setNutritionPoints(user.days[0]?.nutrition || 0);
          setExerciseMins(user.days[0]?.totalActivity || 0);
          setCurrentDayId(user.days[0]?.id || '');
          setCurrentWeight(user.days[0]?.weight || 0);
        } else {
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setCurrentWeight(user.weight || 0);
          const newDayResponse = await fetch(`${import.meta.env.VITE_API_URL}/healthtracker/newDay`, {
            method: 'POST',
            headers: {
              'Authorization': token ? `Bearer ${token}` : '',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              weight: user.weight || 0,
              date: todaysDate,
            }),
          });
                   
          if (!newDayResponse.ok) {
            throw new Error('Failed to create new day');
          }

          const newDayData = await newDayResponse.json();
          setCurrentDayId(newDayData._id);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId, todaysDate]);

  useEffect(() => {
    if (!localStorage.getItem('jwtToken')) {
      navigate('/login');  
    }
  }, [navigate]);

  return (
    <div>
      <DashBoardComponent
        water={waterIntake}
        nutrition={nutritionPoints}
        weight={currentWeight}
        exercise={exerciseMins}
        firstName={firstName}
        lastName={lastName}
      />
    </div>
  );
};

export default DashBoard;
