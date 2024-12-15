import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import LoginComponent from '../components/Login';  

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();  

 
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

  
  const onSubmit = async () => {
    const { username, password } = credentials;
    const userDetails = { username, password };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      if (!response.ok) {
        if (response.status === 401) {
          handleClickOpen();  
        } else {
          throw new Error('Login failed');
        }
      }

      const data = await response.json();

      
      localStorage.setItem('jwtToken', data.token);
      localStorage.setItem('userId', data.userId);

     if(response.ok){
      navigate('/'); 
     }
     
    } catch (error) {
      console.error('Login Error:', error);
      if (error.message === 'Login failed') {
        handleClickOpen();  
      }
    }
  };

  return (
    <div>
      <LoginComponent
        message="Please enter your credentials"
        usernameAction={onChange}
        passwordAction={onChange}
        submitAction={onSubmit}
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Login;
