import { useState } from 'react';
import axios from 'axios';
import LoginComponent from '../components/Login';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate hook

  const onChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = credentials;
    const userDetails = { username, password };

    try {
      const result = await axios.post('/auth/login', userDetails);
      localStorage.setItem('jwtToken', result.data.token);
      localStorage.setItem('userId', result.data.userId);
      navigate('/');  // Use navigate() instead of history.push()
    } catch (error) {
      console.error('Login Error:', error);
      if (error.response && error.response.status === 401) {
        handleClickOpen();
      }
    }
  };

  return (
    <div>
      <LoginComponent
        usernameAction={onChange}
        passwordAction={onChange}
        submitAction={onSubmit}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default Login;
