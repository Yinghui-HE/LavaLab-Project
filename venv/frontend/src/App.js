////import logo from './logo.svg';
////import './App.css';
////
////function App() {
////  return (
////    <div className="App">
////      <header className="App-header">
////        <img src={logo} className="App-logo" alt="logo" />
////        <p>
////          Edit <code>src/App.js</code> and save to reload.
////        </p>
////        <a
////          className="App-link"
////          href="https://reactjs.org"
////          target="_blank"
////          rel="noopener noreferrer"
////        >
////          Learn React
////        </a>
////      </header>
////    </div>
////  );
////}
////
////export default App;
//
////import logo from './logo.svg';
////import './App.css';
////import React, { useEffect, useState } from 'react';
////import axios from 'axios'
////
////function App() {
////  const [getMessage, setGetMessage] = useState({})
////
////  useEffect(()=>{
////    axios.get('http://localhost:5000/flask/hello').then(response => {
////      console.log("SUCCESS", response)
////      setGetMessage(response)
////    }).catch(error => {
////      console.log(error)
////    })
////
////  }, [])
////  return (
////    <div className="App">
////      <header className="App-header">
////        <img src={logo} className="App-logo" alt="logo" />
////        <p>React + Flask Tutorial</p>
////        <div>{getMessage.status === 200 ?
////          <h3>{getMessage.data.message}</h3>
////          :
////          <h3>LOADING</h3>}</div>
////      </header>
////    </div>
////  );
////}
////
////export default App;
//
//import React from 'react';
//import { Router, Route, Switch, Redirect } from 'react-router-dom';
////import { connect } from 'react-redux';
//

import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard'
import UserProfile from './UserProfile'
import { Redirect, Switch, Route } from 'react-router-dom';

function App() {

//    let element = useRoutes([
//    // A route object has the same properties as a <Route>
//    // element. The `children` is just an array of child routes.
//    { path: '/', element: <Home /> },
//    {
//      path: 'users',
//      element: <Users />,
//      children: [
//        { path: '/', element: <UsersIndex /> },
//        { path: ':id', element: <UserProfile /> },
//        { path: 'me', element: <OwnUserProfile /> },
//      ]
//    }
//  ]);
//
//  return element;
        return (

                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/profile" component={UserProfile} />
                        <Route path="/" component={Login} />
                        <Redirect from="*" to="/" />
                    </Switch>

        );

}

export default App;