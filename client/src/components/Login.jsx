/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
