/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import WeightGoalCard from '../../components/WeightGoalCard';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const WeightGoal = () => {
  const [redirect, setRedirect] = useState(false);
  const [weight, setWeight] = useState(0);
  const [updatedWeight, setUpdatedWeight] = useState(0);
  const [currentDayId, setCurrentDayId] = useState('');
  const [quantities, setQuantities] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    // Fetch weight data when the component mounts
    const fetchData = async () => {
      const url = `/api/healthtracker/getDaysWeight/${localStorage.getItem('userId')}`;
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

      try {
        const res = await axios.get(url);
        const data = res.data;

        // Process data
        const weightQuantities = data.map(entry => entry.weight).reverse();
        const datesArr = data.map(entry => moment(entry.date).format('MM/DD/YYYY')).reverse();

        // Set state
        setWeight(data[0]?.weight || 0);
        setUpdatedWeight(data[0]?.weight || 0);
        setCurrentDayId(data[0]?._id || '');
        setQuantities(weightQuantities);
        setDates(datesArr);
      } catch (err) {
        console.error('Error fetching weight data:', err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setUpdatedWeight(e.target.value);
  };

  const handleClick = async () => {
    try {
      const updatedQuantities = [...quantities.slice(0, -1), updatedWeight];
      setQuantities(updatedQuantities);
      setWeight(updatedWeight);

      axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      await axios.post('/api/healthTracker/updateWeight', {
        weight: updatedWeight,
        id: currentDayId
      });

      console.log('Weight updated successfully');
    } catch (err) {
      console.error('Error updating weight:', err);
    }
  };

  if (!localStorage.getItem('jwtToken')) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <WeightGoalCard
        handleChange={handleChange}
        handleClick={handleClick}
        weight={weight}
        updatedWeight={updatedWeight}
        quantities={quantities}
        dates={dates}
      />
    </div>
  );
};

export default WeightGoal;
