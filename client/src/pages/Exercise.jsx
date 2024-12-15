/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ExerciseGoalCard from '../components/Exercise';
import { useNavigate } from 'react-router-dom'; 
import moment from 'moment';

const ExerciseGoal = () => {
  const [currentDayId, setCurrentDayId] = useState('');
  const [newExercise, setNewExercise] = useState('');
  const [newDuration, setNewDuration] = useState(0);
  const [dailyTotal, setDailyTotal] = useState(0);
  const [todaysActivity, setTodaysActivity] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [dates, setDates] = useState([]);

  const navigate = useNavigate();  

  useEffect(() => {
   
    if (!localStorage.getItem('jwtToken')) {
      navigate('/login');  
    }

    const fetchDays = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const url = `${import.meta.env.VITE_API_URL}/health/getDays/${userId}`;
        const token = localStorage.getItem('jwtToken');

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        const exerciseQuantities = data.map(day => day.totalActivity).reverse();
        const datesArr = data.map(day => moment(day.date).format('MM/DD/YYYY')).reverse();

        setCurrentDayId(data[0]?._id || '');
        setDailyTotal(data[0]?.totalActivity || 0);
        setTodaysActivity(data[0]?.exercises || []);
        setQuantities(exerciseQuantities);
        setDates(datesArr);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDays();
  }, [navigate]);

  const handleDurationChange = (e) => {
    setNewDuration(parseInt(e.target.value) || 0);
  };

  const handleExerciseChange = (e) => {
    setNewExercise(e.target.value);
  };

  const addExercise = async () => {
    const updatedActivities = [
      ...todaysActivity,
      { exercise: newExercise, duration: newDuration }
    ];
    const updatedDailyTotal = dailyTotal + newDuration;

    setTodaysActivity(updatedActivities);
    setDailyTotal(updatedDailyTotal);

    try {
      const token = localStorage.getItem('jwtToken');
      const url = `${import.meta.env.VITYE_API_URL}/health/newExercise`;
      const body = JSON.stringify({
        exercise: newExercise,
        duration: newDuration,
        totalActivity: updatedDailyTotal,
        currentDayId: currentDayId
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: body
      });
    console.log(response);
      if (!response.ok) {
        throw new Error('Error adding exercise');
      }

      console.log('Exercise added successfully!');
    } catch (err) {
      console.error('Error adding exercise:', err);
    }
  };

  return (
    <div>
      <ExerciseGoalCard
        dates={dates}
        quantities={quantities}
        totalActivity={dailyTotal}
        todaysActivities={todaysActivity}
        addExercise={addExercise}
        handleExerciseChange={handleExerciseChange}
        handleDurationChange={handleDurationChange}
        activity={newExercise}
      />
    </div>
  );
};

export default ExerciseGoal;
