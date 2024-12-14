/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ExerciseGoalCard from '../../components/ExerciseGoalCard';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

const ExerciseGoal = () => {
  const [redirect, setRedirect] = useState(false);
  const [currentDayId, setCurrentDayId] = useState('');
  const [newExercise, setNewExercise] = useState('');
  const [newDuration, setNewDuration] = useState(0);
  const [dailyTotal, setDailyTotal] = useState(0);
  const [todaysActivity, setTodaysActivity] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchDays = async () => {
      try {
        const url = `/api/healthtracker/getDays/${localStorage.getItem('userId')}`;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        const res = await axios.get(url);
        const data = res.data;

        console.log(data);

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
  }, []);

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
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      await axios.post('/api/healthTracker/newExercise', {
        exercise: newExercise,
        duration: newDuration,
        totalActivity: updatedDailyTotal,
        currentDayId: currentDayId
      });
      console.log('Exercise added successfully!');
    } catch (err) {
      console.error('Error adding exercise:', err);
    }
  };

  if (!localStorage.getItem('jwtToken')) {
    return <Redirect to="/login" />;
  }

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
