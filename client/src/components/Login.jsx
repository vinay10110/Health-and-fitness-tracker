/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';  // Updated to @mui/material
import TextField from '@mui/material/TextField';  // Updated to @mui/material
import Grid from '@mui/material/Grid';  // Updated to @mui/material
import Button from '@mui/material/Button';  // Updated to @mui/material
import Tooltip from '@mui/material/Tooltip';  // Updated to @mui/material
import Dialog from '@mui/material/Dialog';  // Updated to @mui/material
import DialogActions from '@mui/material/DialogActions';  // Updated to @mui/material
import DialogContent from '@mui/material/DialogContent';  // Updated to @mui/material
import DialogContentText from '@mui/material/DialogContentText';  // Updated to @mui/material
import DialogTitle from '@mui/material/DialogTitle';  // Updated to @mui/material
import styled from 'styled-components';

// Styled Components
const Root = styled(Paper)`
  padding-top: 16px;
  padding-bottom: 16px;
  margin: 5%;
  margin-top: 4%;
`;

const Header = styled(Typography)`
  text-align: center;
`;

const ButtonContainer = styled(Grid)`
  padding-bottom: 6%;
`;

const CustomTextField = styled(TextField)`
  margin-bottom: 16px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-bottom: 16px;
`;

const StyledDialog = styled(Dialog)`
  .MuiDialogTitle-root {
    font-size: 1.5rem;
  }
`;

class Login extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Root elevation={1}>
          <Header variant="h5" component="h3">
            Log In
          </Header>
          <h4>{this.props.message}</h4>
          <CustomTextField
            id="username"
            label="Username (required)"
            margin="normal"
            fullWidth
            onChange={this.props.usernameAction}
          />
          <Tooltip title="Case Sensitive">
            <CustomTextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              fullWidth
              onChange={this.props.passwordAction}
            />
          </Tooltip>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <StyledButton
                size="large"
                variant="contained"
                color="primary"
                onClick={this.props.submitAction}
              >
                Submit
              </StyledButton>
            </Grid>
            <Grid item xs={12} sm={3}>
              <StyledButton size="small" variant="contained" href="/signup">
                New User
              </StyledButton>
            </Grid>
          </Grid>
        </Root>

        <StyledDialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Incorrect Username or Password'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please try again
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </StyledDialog>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Login;
