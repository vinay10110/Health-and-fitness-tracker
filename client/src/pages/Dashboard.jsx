/* eslint-disable no-unused-vars */
import  { useState, useEffect } from 'react';
import DashBoardComponent from '../../components/DashBoard';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const DashBoard = () => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [currentDayId, setCurrentDayId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [waterIntake, setWaterIntake] = useState(0);
  const [nutritionPoints, setNutritionPoints] = useState(0);
  const [exerciseMins, setExerciseMins] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const todaysDate = moment().format('MM.DD.YYYY');

  const totalExerciseMinutes = (arr) => {
    return arr.reduce((total, activity) => total + activity.duration, 0);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = `/api/healthtracker/user/${userId}`;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        
        const res = await axios.get(url);
        const user = res.data;
        
        let mostRecentDate = user.days.length
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

          // Create a new day
          const newDayResponse = await axios.post('/api/healthtracker/newDay', {
            userId,
            weight: user.weight || 0,
            date: todaysDate,
          });
          setCurrentDayId(newDayResponse.data._id);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId, todaysDate]);

  if (!localStorage.getItem('jwtToken')) {
    return <Redirect to="/login" />;
  }

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
