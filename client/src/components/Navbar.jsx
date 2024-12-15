/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Button, IconButton, Drawer, ListItem, Divider, ListItemIcon, ListItemText } from '@mui/material';  // Updated to @mui/material
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';  // Updated to @mui/icons-material
import HomeIcon from '@mui/icons-material/Home';  // Updated to @mui/icons-material
import { withStyles } from '@mui/styles';


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
      <div >
        <a style={{ textDecoration: 'none', color: 'white' }} href="/">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </a>
        <Divider />
        <a style={{ textDecoration: 'none', color: 'white' }} href="/water">
          <ListItem button>
            <ListItemText primary="Water" />
          </ListItem>
        </a>
        <a style={{ textDecoration: 'none', color: 'white' }} href="/nutrition">
          <ListItem button>
            <ListItemText primary="Nutrition" />
          </ListItem>
        </a>
        <a style={{ textDecoration: 'none', color: 'white' }} href="/exercise">
          <ListItem button>
            <ListItemText primary="Exercise" />
          </ListItem>
        </a>
        <a style={{ textDecoration: 'none', color: 'white' }} href="/weight">
          <ListItem button>
            <ListItemText primary="Weight" />
          </ListItem>
        </a>
        <a style={{ textDecoration: 'none', color: 'white' }} href="/info">
          <ListItem button>
            <ListItemText primary="More Info" />
          </ListItem>
        </a>
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
