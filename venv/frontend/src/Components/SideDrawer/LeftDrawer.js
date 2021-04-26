import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

//import Dashboard from "../../Dashboard.js"
import UserProfile from "../../UserProfile.js"
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function LeftDrawer(props) {
  const classes = useStyles();
  console.log("drawer class: ", props);
  const [profileRedirect, setProfileRedirect] = useState(false);
  const userInfo = useState(props.userInfo);
//  const [nextAddress, setNextAddress] = useState("");


  function handleProfileOnclick(address) {
    console.log("address:", address);
    console.log("props:", props);
    console.log("userInfo:", userInfo);
//    setNextAddress('/' + address.toLowerCase());
    setProfileRedirect(true);
//    return (
//        <BrowserRouter>
//            <Route path = '/profile'
//                render = {props => <UserProfile {...props} data={props} />} />
//            <Redirect to='/profile'/>
//        </BrowserRouter>
//    );
//    return <Redirect to = {{ pathname: '/profile', data: {props} }} />
  }


  return (
    profileRedirect ?
    (
        <BrowserRouter>
            <Route path = '/profile'
                render = {userInfo => <UserProfile {...userInfo} data={userInfo} />} />
            <Redirect to='/profile'/>
        </BrowserRouter>
    ) :
    (<div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" noWrap>
            al dente
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {['Dashboard', 'Profile', 'Maps'].map((text, index) => (
            <ListItem button key={text} onClick={ () => handleProfileOnclick({text})}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>)
  );
}
