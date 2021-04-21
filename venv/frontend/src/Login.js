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

import React, { useState } from 'react';
import { withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import axios from 'axios'
import './Login.css';

const styles = theme => ({
    margin: {
        margin: theme.spacing(10),
    },
    padding: {
        padding: theme.spacing(1)
    },
});

function Login() {

//        const { classes } = this.props;
//        const {classes} = this.props;
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');



        function handleSubmit(event) {
            console.log( 'Email:', email, 'Password: ', password);
           // You should see email and password in console.
           // ..code to submit form to backend here...

            axios({
              url: '/loginform',
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
              },
              data: {
                email: email,
                password: password
              }
            })
//            .then(response => {/* handle the response */})
//            .catch(error => console.error('timeout exceeded'))
        }

        return (
            <div className="login-wrapper">
            <form id="form" noValidate autoComplete="off">
                <div className="text-field">
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Username" type="email"
                                onInput={ e=>setEmail(e.target.value)} fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="password" label="Password" type="password"
                                onInput={ e=>setPassword(e.target.value)} fullWidth required />
                        </Grid>
                    </Grid>
                </div>
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
                    <Button
                        variant="outlined" color="primary" style={{ textTransform: "none", marginRight: '5%' }}
                        onClick={() => { handleSubmit() }} >
                      Login
                    </Button>
                    <Button
                        variant="outlined" color="primary" style={{ textTransform: "none" }}
                        onClick={() => { alert('clicked') }}>
                      Register
                    </Button>
                </Grid>
            </form>
            </div>
        );

}

export default withStyles(styles)(Login);