//import React from 'react';
//import './Login.css';
//import Button from '@material-ui/core/Button';
//
////import axios from 'axios'
//
//class LoginTab extends React.Component {
//  render() {
//    const { classes } = this.props;
//    return(
//    <div className="login-wrapper">
//      <h1>Please Log In</h1>
//      <form>
//        <label>
//          <p>Username</p>
//          <input type="text" />
//        </label>
//        <label>
//          <p>Password</p>
//          <input type="password" />
//        </label>
//        <div>
//          <Button variant="contained">
//            Log In
//          </Button>
//        </div>
//        <div>
//          <Button variant="contained">
//            Register
//          </Button>
//        </div>
//        <div>
//
//        </div>
//      </form>
//    </div>
//    )
//  }
//}

import React from 'react';
import { withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit
    }
});

class Login extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className="login-wrapper">
                <div className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Username" type="email" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="password" label="Password" type="password" fullWidth required />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                />
                            } label="Remember me" />
                        </Grid>
                        <Grid item>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Login);