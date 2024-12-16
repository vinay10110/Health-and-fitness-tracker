import { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const Root = styled(Paper)`
  padding-top: 16px;
  padding-bottom: 16px;
  margin: 5%;
  margin-top: 4%;
`;

const Header = styled(Typography)`
  text-align: center;
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

const Login = ({
  message,
  usernameAction,
  passwordAction,
  submitAction,
  open,
  handleClose,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    if (usernameAction) usernameAction(event);  
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (passwordAction) passwordAction(event);  
  };

  const handleSubmit = () => {
    if (submitAction) submitAction();  
  };

  return (
    <div>
      <Root elevation={1}>
        <Header variant="h5" component="h3">
          Log In
        </Header>
        <Typography variant="h6" align="center">
          {message}
        </Typography>
        <CustomTextField
          id="username"
          label="Username (required)"
          margin="normal"
          fullWidth
          value={username}
          onChange={handleUsernameChange}
        />
        <Tooltip title="Case Sensitive">
          <CustomTextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
          />
        </Tooltip>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <StyledButton
              size="large"
              variant="contained"
              color="primary"
              onClick={handleSubmit}  
            >
              Submit
            </StyledButton>
          </Grid>
          <Grid item xs={12} sm={3}>
            <StyledButton size="large" variant="contained" >
              <Link to='/signup' style={{textDecoration:'none'}} > New User</Link>
             
            </StyledButton>
          </Grid>
        </Grid>
      </Root>

      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Incorrect Username or Password'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

Login.propTypes = {
  message: PropTypes.string,
  usernameAction: PropTypes.func,
  passwordAction: PropTypes.func,
  submitAction: PropTypes.func,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default Login;
