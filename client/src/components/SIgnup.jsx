import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';  // Updated to @mui/material
import Grid from '@mui/material/Grid';  // Updated to @mui/material
import Button from '@mui/material/Button';  // Updated to @mui/material
import styled from 'styled-components';

// Styled Components
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

class Signup extends React.Component {
  render() {
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
                onChange={this.props.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldStyled
                name="lastName"
                label="Last Name (required)"
                fullWidth
                onChange={this.props.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldStyled
                name="username"
                label="Username (required)"
                fullWidth
                onChange={this.props.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldStyled
                name="weight"
                label="Weight (optional)"
                fullWidth
                onChange={this.props.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldStyled
                name="password"
                label="Password"
                type="password"
                fullWidth
                onChange={this.props.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldStyled
                name="passwordConfirmation"
                label="Confirm Password"
                type="password"
                fullWidth
                onChange={this.props.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton
                size="large"
                variant="contained"
                color="primary"
                onClick={this.props.handleSubmit}
              >
                Submit
              </SubmitButton>
            </Grid>
          </Grid>
        </RootPaper>
      </div>
    );
  }
}

Signup.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Signup;
