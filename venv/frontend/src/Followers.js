import React, { useState, useEffect } from "react";
import axios from 'axios';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
//import Icon from "@material-ui/core/Icon";
// @material-ui/icons
//import Store from "@material-ui/icons/Store";
//import Warning from "@material-ui/icons/Warning";
//import DateRange from "@material-ui/icons/DateRange";
//import LocalOffer from "@material-ui/icons/LocalOffer";
//import Update from "@material-ui/icons/Update";
//import ArrowUpward from "@material-ui/icons/ArrowUpward";
import LocationOn from "@material-ui/icons/LocationOn";
//import Accessibility from "@material-ui/icons/Accessibility";
//import BugReport from "@material-ui/icons/BugReport";
//import Code from "@material-ui/icons/Code";
//import Cloud from "@material-ui/icons/Cloud";
//import Rating from '@material-ui/lab/Rating';
//import CardMedia from '@material-ui/core/CardMedia';


// core components
//import Table from "components/Table/Table.js";
//import Tasks from "components/Tasks/Tasks.js";
//import CustomTabs from "components/CustomTabs/CustomTabs.js";
//import Danger from "components/Typography/Danger.js";
import Card from "./Components/Card/Card.js";
import CardHeader from "./Components/Card/CardHeader.js";
import CardIcon from "./Components/Card/CardIcon.js";
import CardBody from "./Components/Card/CardBody.js";
import CardFooter from "./Components/Card/CardFooter.js";
import GridItem from "./Components/Grid/GridItem.js";
import GridContainer from "./Components/Grid/GridContainer.js";

import styles from "./Style/DashboardStyle.js";
import LeftDrawer from "./Components/SideDrawer/LeftDrawer.js"
import { useHistory } from "react-router-dom";
import Follower from "./Follower.js"
import { BrowserRouter, Redirect, Route } from 'react-router-dom';


const useStyles = makeStyles(styles);


function Followers(props) {
    console.log("followers (user id =:", props.data.user_id);
    const userID = props.data.user_id;
    const classes = useStyles();
    let history = useHistory();
    console.log("history:", history);
    const curr_location = history.location.pathname;
//    const [restaurants, setRestaurants] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [followers, setFollowers] = useState([]);

    const [followerRedirect, setFollowerRedirect] = useState(false);
    const [followerInfo, setFollowerInfo] = useState(-1);

//    setFollowers(props.data.followers);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        getUserInfo();


        function getUserInfo() {
        axios({
              url: '/dashboard',
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
              },
              data: {
                userID: userID,
              }
            })
            .then(response => {
                console.log(response);
                if (response.data.status === "Success") {
//                    console.log("restaurants: ", response.data.restaurants);
//                    setRestaurants(response.data.restaurants);
                    console.log("user_info:", response.data.user_info);
                    setUserInfo(response.data.user_info);
                    console.log("followers", response.data.followers)
                    setFollowers(response.data.followers)

                    console.log("followers props:", props);
                }
            })
            .catch(error => console.error('timeout exceeded'))
    }

    }, [userID, props]);

    if (followerRedirect) {
            console.log("followerRedirect: ", followerRedirect);

//            history.push({
//                pathname: "/restaurant",
//                state: {
//                    restaurant_id: restaurantRedirect
//                }
//            });

            return (
//            <Switch>
//                        <Route path="/restaurant" component={Restaurant} />
//                    </Switch>
                <BrowserRouter>
                    <Route path = '/follower'
                        render = {props => <Follower {...props} data={{followerInfo, userInfo}} />} />
                    <Redirect to={{ pathname: '/follower'}}/>
                </BrowserRouter>
            );
        }

    return (

        <div id="left_drawer">
            <LeftDrawer userInfo={userInfo} currLocation={curr_location} />
                <div id="followers">
                  <GridContainer>
                    {followers.map(follower => (
                        <GridItem xs={12} sm={12} md={4} key={follower.follower_id}>
                          <Card>
                            <CardHeader color="warning" stats icon>
                              <CardIcon color="warning">
                                <img src={follower.follower_pic_url} alt={follower.follower_name} width='200px' height='200px' />
                              </CardIcon>
                            </CardHeader>
                          <CardBody>
                              <button className={classes.cardTitle} onClick = {() => {
                                    setFollowerRedirect(true);
                                    setFollowerInfo(follower);
                              }}>
                                {follower.follower_name}
                              </button>
                              <h4 className={classes.cardTitle}>{follower.follower_email}</h4>
                            </CardBody>
                            <CardFooter chart>
                              <div className={classes.stats}>
                                <LocationOn /> {follower.follower_location}
                              </div>
                            </CardFooter>
                          </Card>
                        </GridItem>
                    ))}
                  </GridContainer>
            </div>
        </div>
    );
};

export default Followers;