/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Button, IconButton, Drawer, ListItem, Divider, ListItemIcon, ListItemText } from '@mui/material'; 
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';  
import HomeIcon from '@mui/icons-material/Home';  
import { withStyles } from '@mui/styles';
import {Link} from 'react-router-dom';
const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  list: {
    width: 250
  }
};

const Navbar = ({ classes }) => {
  const [left, setLeft] = useState(false);

  const toggleDrawer = (open) => {
    setLeft(open);
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    window.location.reload();
  };

  const sideList = (
    <div className={classes.list}>
      <div>
        <ListItem component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider />
        <ListItem component={Link} to="/water" className={classes.link} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="Water" />
        </ListItem>
        <ListItem component={Link} to="/nutrition" className={classes.link} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="Nutrition" />
        </ListItem>
        <ListItem component={Link} to="/exercise" className={classes.link} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="Exercise" />
        </ListItem>
        <ListItem component={Link} to="/weight" className={classes.link} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemText primary="Weight" />
        </ListItem>
   
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => toggleDrawer(true)}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={left} onClose={() => toggleDrawer(false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={() => toggleDrawer(false)}
              onKeyDown={() => toggleDrawer(false)}
            >
              {sideList}
            </div>
          </Drawer>

          <Typography variant="h6" color="inherit" className={classes.flex}>
            <a style={{ textDecoration: 'none', color: 'white' }} href="/">
              HealthTracker
            </a>
          </Typography>
          {localStorage.getItem('jwtToken') ? (
            <Button
              style={{ textDecoration: 'none', color: 'white' }}
              onClick={logout}
              color="inherit"
            >
              Logout
            </Button>
          ) : (
            <Button
              style={{ textDecoration: 'none', color: 'white' }}
              href="/login"
              color="inherit"
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
