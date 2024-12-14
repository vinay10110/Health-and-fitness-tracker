/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import SignupComponent from '../../components/SignupComponent';

const Signup = ({ history }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    weight: '',
    password: '',
    passwordConfirmation: '',
  });
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password === formData.passwordConfirmation) {
      const userDetails = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        weight: formData.weight,
        password: formData.password,
      };

      try {
        await axios.post('/auth/register', userDetails);
        history.push('/login'); // Using the history prop to redirect
      } catch (error) {
        console.error('Error during signup:', error);
        // Handle potential error here
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
        message={message}
      />
    </div>
  );
};

export default Signup;
