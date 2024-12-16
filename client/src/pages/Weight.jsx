/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import WeightGoalCard from '../components/Weight';
import { useNavigate } from 'react-router-dom';  
import moment from 'moment';

const WeightGoal = () => {
  const [weight, setWeight] = useState(0);
  const [updatedWeight, setUpdatedWeight] = useState(0);
  const [currentDayId, setCurrentDayId] = useState('');
  const [quantities, setQuantities] = useState([]);
  const [dates, setDates] = useState([]);

  const navigate = useNavigate();  

  useEffect(() => {
   
    const fetchData = async () => {
      const url = `${import.meta.env.VITE_API_URL}/health/getDaysWeight/${localStorage.getItem('userId')}`;
      const token = localStorage.getItem('jwtToken');

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching weight data');
        }

        const data = await response.json();

       
        const weightQuantities = data.map(entry => entry.weight).reverse();
        const datesArr = data.map(entry => moment(entry.date).format('MM/DD/YYYY')).reverse();

        
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

      const url = `${import.meta.env.VITE_API_URL}/health/updateWeight`;
      const token = localStorage.getItem('jwtToken');
      const body = JSON.stringify({
        weight: updatedWeight,
        id: currentDayId
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: body
      });

      if (!response.ok) {
        throw new Error('Error updating weight');
      }

    } catch (err) {
      console.error('Error updating weight:', err);
    }
  };

  
  if (!localStorage.getItem('jwtToken')) {
    navigate("/login");  
    return null; 
  }

  return (
    <div>
      <WeightGoalCard
        handleChange={handleChange}
        handleClick={handleClick}
        weight={Number(weight)}
        updatedWeight={updatedWeight}
        quantities={quantities}
        dates={dates}
      />
    </div>
  );
};

export default WeightGoal;
