import { useState, useEffect } from 'react';
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
      // Update localStorage with the toggled state for the current user
      localStorage.setItem(`toggled_${userId}`, JSON.stringify(toggled));
    }

    // Retrieve the toggled state for the current user from localStorage
    const storedToggled = localStorage.getItem(`toggled_${userId}`);
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
        const nutritionQuantities = data.map((day) => day.nutrition).reverse();
        const datesArr = data.map((day) => moment(day.date).format('MM/DD/YYYY')).reverse();

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

  const handleSubmit = async () => {
    try {
      const updatedQuantities = [...quantities];
      updatedQuantities[updatedQuantities.length - 1] = updatedNutrition;
      setQuantities(updatedQuantities);

      const url = `${import.meta.env.VITE_API_URL}/health/updateNutrition`;
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

      if (!response.ok) {
        throw new Error('Error updating nutrition');
      }
    } catch (err) {
      console.error('Error updating nutrition:', err);
    }
  };

  const handleChange = (name) => (event) => {
    const { checked } = event.target;

    setToggled((prevState) => {
      const newState = { ...prevState, [name]: checked };

      const newProgress = Object.keys(newState).reduce(
        (count, key) => (newState[key] ? count + 1 : count),
        0
      );
      setProgress(newProgress);
      setUpdatedNutrition(newProgress);

      // Store the toggled state for the current user in localStorage
      localStorage.setItem(`toggled_${userId}`, JSON.stringify(newState));
      localStorage.setItem('date', moment().format('MM/DD/YYYY'));

      return newState;
    });
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
