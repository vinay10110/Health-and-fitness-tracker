/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import WaterGoalCard from '../components/Water';
import { useNavigate } from 'react-router-dom';  
import moment from 'moment';

const WaterGoal = () => {
  const [glasses, setGlasses] = useState(0);
  const [currentDayId, setCurrentDayId] = useState('');
  const [updatedWater, setUpdatedWater] = useState(0);
  const [quantities, setQuantities] = useState([]);
  const [dates, setDates] = useState([]);

  const navigate = useNavigate(); 

  
  useEffect(() => {
    if (!localStorage.getItem('jwtToken')) {
      navigate("/login");  
    }
  }, [navigate]);

  
  useEffect(() => {
    const fetchWaterData = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/health/getDays/${localStorage.getItem('userId')}`;
        const token = localStorage.getItem('jwtToken');

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch water data');
        }

        const data = await response.json();

        
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

  
  const addGlass = (number) => {
    const newTotal = glasses + number;
    const updatedQuantities = [...quantities.slice(0, -1), newTotal];

    setGlasses(newTotal);
    setQuantities(updatedQuantities);

    
    const url = `${import.meta.env.VITE_API_URL}/health/newWater`;
    const token = localStorage.getItem('jwtToken');
    const body = JSON.stringify({
      water: newTotal,
      id: currentDayId
    });

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: body
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error updating water');
        }
        
      })
      .catch(err => console.error('Error updating water:', err));
  };

 
  const handleChange = (e) => {
    setUpdatedWater(parseInt(e.target.value) || 0);
  };

  
  const handleClick = () => {
    if (!updatedWater) return;

    const newTotal = glasses + updatedWater;
    const updatedQuantities = [...quantities.slice(0, -1), newTotal];

    setGlasses(newTotal);
    setQuantities(updatedQuantities);

    
    const url = `${import.meta.env.VITE_API_URL}/health/newWater`;
    const token = localStorage.getItem('jwtToken');
    const body = JSON.stringify({
      water: newTotal,
      id: currentDayId
    });

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: body
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error updating water');
        }
        console.log('Water updated successfully');
      })
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
