/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import NutritionGoalCard from '../components/Nutrition';
import { useNavigate } from 'react-router-dom';  
import moment from 'moment';

const NutritionGoal = () => {
  const [token] = useState(localStorage.getItem('jwtToken'));
  const [userId] = useState(localStorage.getItem('userId'));
  const [progress, setProgress] = useState(0);
  const [currentDayId, setCurrentDayId] = useState('');
  const [updatedNutrition, setUpdatedNutrition] = useState(0);
  const [quantities, setQuantities] = useState([]);
  const [dates, setDates] = useState([]);
  const [toggled, setToggled] = useState({
    healthyFat: false,
    proteinBreakfast: false,
    fruitAndVegs: false,
    newFruit: false,
    newReceipe: false,
    fastFood: false,
    noMeat: false,
    skipBreakfast: false,
    noSugar: false,
    noAlcohol: false
  });

  const navigate = useNavigate();  

  useEffect(() => {
    
    const savedDate = localStorage.getItem('date');
    if (moment().format('MM/DD/YYYY') !== savedDate) {
      localStorage.setItem('toggled', JSON.stringify(toggled));
    }

    const storedToggled = localStorage.getItem('toggled');
    const initialToggled = storedToggled ? JSON.parse(storedToggled) : toggled;

    setToggled(initialToggled);
    setProgress(
      Object.keys(initialToggled).reduce(
        (count, key) => (initialToggled[key] ? count + 1 : count),
        0
      )
    );

    
    const fetchData = async () => {
      try {
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

        const nutritionQuantities = data.map(day => day.nutrition).reverse();
        const datesArr = data.map(day => moment(day.date).format('MM/DD/YYYY')).reverse();

        setUpdatedNutrition(data[0]?.nutrition || 0);
        setCurrentDayId(data[0]?._id || '');
        setQuantities(nutritionQuantities);
        setDates(datesArr);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [token, userId]);

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setToggled(prevState => {
      const newState = { ...prevState, [value]: !prevState[value] };
      localStorage.setItem('toggled', JSON.stringify(newState));
      localStorage.setItem('date', moment().format('MM/DD/YYYY'));
      setProgress(Object.keys(newState).reduce((count, key) => (newState[key] ? count + 1 : count), 0));
      return newState;
    });
  };

  const handleSubmit = async () => {
    try {
      const updatedQuantities = [...quantities.slice(0, -1), updatedNutrition];
      setQuantities(updatedQuantities);

      const url = `${import.meta.env.VITE_API_URL}/health/updateNutrition`;
      const token = localStorage.getItem('jwtToken');
      const body = JSON.stringify({
        nutrition: progress,
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
console.log(response);
      if (!response.ok) {
        throw new Error('Error updating nutrition');
      }

      console.log('Nutrition data updated successfully!');
    } catch (err) {
      console.error('Error updating nutrition:', err);
    }
  };

  const handleChange = (name) => (event, isChecked) => {
    handleCheckboxChange(event);
    setToggled(prevState => ({ ...prevState, [name]: event.target.checked }));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");  
    }
  }, [token, navigate]);

  return (
    <div>
      <NutritionGoalCard
        quantities={quantities}
        dates={dates}
        handleChange={handleChange}
        progress={progress}
        handleSubmit={handleSubmit}
        toggled={toggled}
      />
    </div>
  );
};

export default NutritionGoal;
