/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import WaterGoalCard from '../../components/WaterGoalCard';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const WaterGoal = () => {
  const [redirect, setRedirect] = useState(false);
  const [glasses, setGlasses] = useState(0);
  const [currentDayId, setCurrentDayId] = useState('');
  const [updatedWater, setUpdatedWater] = useState(0);
  const [quantities, setQuantities] = useState([]);
  const [dates, setDates] = useState([]);

  // Check redirect condition
  if (!localStorage.getItem('jwtToken')) {
    return <Redirect to="/login" />;
  }

  // Fetch data on component mount
  useEffect(() => {
    const fetchWaterData = async () => {
      try {
        const url = `/api/healthtracker/getDays/${localStorage.getItem('userId')}`;
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

        const res = await axios.get(url);
        const data = res.data;

        // Prepare water data for state
        const waterQuantities = data.map(entry => entry.water).reverse();
        const datesArr = data.map(entry => moment(entry.date).format("MM/DD/YYYY")).reverse();

        setGlasses(data[0]?.water || 0);
        setCurrentDayId(data[0]?._id || '');
        setQuantities(waterQuantities);
        setDates(datesArr);
      } catch (err) {
        console.error('Error fetching water data:', err);
      }
    };

    fetchWaterData();
  }, []);

  // Add glass handler
  const addGlass = (number) => {
    const newTotal = glasses + number;
    const updatedQuantities = [...quantities.slice(0, -1), newTotal];

    setGlasses(newTotal);
    setQuantities(updatedQuantities);

    // Update server
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios
      .post('/api/healthTracker/newWater', {
        water: newTotal,
        id: currentDayId
      })
      .then(() => console.log('Water updated successfully'))
      .catch(err => console.error('Error updating water:', err));
  };

  // Handle input change
  const handleChange = (e) => {
    setUpdatedWater(parseInt(e.target.value) || 0);
  };

  // Handle manual water update
  const handleClick = () => {
    if (!updatedWater) return;

    const newTotal = glasses + updatedWater;
    const updatedQuantities = [...quantities.slice(0, -1), newTotal];

    setGlasses(newTotal);
    setQuantities(updatedQuantities);

    // Update server
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios
      .post('/api/healthTracker/newWater', {
        water: newTotal,
        id: currentDayId
      })
      .then(() => console.log('Water updated successfully'))
      .catch(err => console.error('Error updating water:', err));
  };

  return (
    <div>
      <WaterGoalCard
        addGlass={addGlass}
        handleChange={handleChange}
        handleClick={handleClick}
        glasses={glasses}
        quantities={quantities}
        dates={dates}
      />
    </div>
  );
};

export default WaterGoal;
