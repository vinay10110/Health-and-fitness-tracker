import  { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import styled from 'styled-components';

const RootPaper = styled(Paper)`
  padding: 16px;
  margin: 4%;
`;

const Header = styled(Typography)`
  text-align: center;
  margin-bottom: 16px;
`;

const TextFieldStyled = styled(TextField)`
  margin: 8px 0;
`;

const SubmitButton = styled(Button)`
  margin-top: 16px;
  width: 100%;
`;

const Signup = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    weight: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = () => {
    handleSubmit(formData);
  };

  return (
    <div>
      <RootPaper elevation={1}>
        <Header variant="h5" component="h3">
          Create Account
        </Header>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextFieldStyled
              name="firstName"
              label="First Name (required)"
              fullWidth
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldStyled
              name="lastName"
              label="Last Name (required)"
              fullWidth
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldStyled
              name="username"
              label="Username (required)"
              fullWidth
              value={formData.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldStyled
              name="weight"
              label="Weight (optional)"
              fullWidth
              value={formData.weight}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldStyled
              name="password"
              label="Password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextFieldStyled
              name="passwordConfirmation"
              label="Confirm Password"
              type="password"
              fullWidth
              value={formData.passwordConfirmation}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton
              size="large"
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              Submit
            </SubmitButton>
          </Grid>
        </Grid>
      </RootPaper>
    </div>
  );
};

Signup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Signup;
