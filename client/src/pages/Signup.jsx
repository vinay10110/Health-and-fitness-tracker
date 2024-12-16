/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import SignupComponent from '../components/SIgnup';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    weight: '',
    password: '',
    passwordConfirmation: '',
  });
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (formData) => {
    if (formData.password === formData.passwordConfirmation) {
      const userDetails = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        weight: formData.weight,
        password: formData.password,
      };

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
        });
        if (!response.ok) {
          throw new Error('Failed to register. Please check your input or try again later.');
        }

        const data = await response.json();
        navigate('/login'); 
      } catch (error) {
        console.error('Error during signup:', error);
        handleClickOpen();
      }
    } else {
      handleClickOpen();
    }
  };

  return (
    <div>
      <SignupComponent
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        open={open}
      />
    </div>
  );
};

export default Signup;
