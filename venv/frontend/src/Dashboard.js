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
import Rating from '@material-ui/lab/Rating';
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
import Restaurant from "./Restaurant.js"
import { BrowserRouter, Redirect, Route } from 'react-router-dom';


const useStyles = makeStyles(styles);


function Dashboard(props) {
    console.log("userIDDDD:", props.data.user_id)
    const userID = props.data.user_id;
    const classes = useStyles();
    let history = useHistory();
    console.log("history:", history);
    const curr_location = history.location.pathname;
    const [userRestaurants, setUserRestaurants] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [followers, setFollowers] = useState({});
    const [restaurantRedirect, setRestaurantRedirect] = useState(false);
    const [restaurantInfo, setRestaurantInfo] = useState(-1);



    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        if (userID !== -1) {
            getUserInfo();
        }



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
                    console.log("restaurants: ", response.data.restaurants);
                    setUserRestaurants(response.data.restaurants);
                    console.log("user_info:", response.data.user_info);
                    setUserInfo(response.data.user_info);
                    console.log("followers", response.data.followers)
                    setFollowers(response.data.followers)

                    console.log("dashboard props:", props);
                }
            })
            .catch(error => console.error('timeout exceeded'))
    }

    }, [userID, props]);

    if (restaurantRedirect) {
            console.log("restaurantRedirect: ", restaurantRedirect);

//            history.push({
//                pathname: "/restaurant",
//                state: {
//                    restaurant_id: restaurantRedirect
//                }
//            });

            return (
                <BrowserRouter>
                    <Route path = '/restaurant'
                        render = {props => <Restaurant {...props} data={{restaurantInfo, userInfo, userRestaurants}} />} />
                    <Redirect to={{ pathname: '/restaurant'}}/>
                </BrowserRouter>
            );
        }

    return (

        <div id="left_drawer">
            <LeftDrawer userInfo={userInfo} currLocation={curr_location} />
                <div id="restaurants">
                  <GridContainer>
                    {userRestaurants.map(restaurant => (
                        <GridItem xs={12} sm={12} md={4} key={restaurant.r_id}>
                          <Card>
                            <CardHeader color="warning" stats icon>
                              <CardIcon color="warning">
                                <img src={restaurant.r_pic_url} alt={restaurant.r_name} width='200px' height='200px' />
                              </CardIcon>
                            </CardHeader>
                          <CardBody>
                              <button className={classes.cardTitle} onClick = {() => {
                                    setRestaurantRedirect(true);
                                    setRestaurantInfo(restaurant);
                              }}>
                                {restaurant.r_name}, Ratings: {restaurant.r_rating}
                              </button>
                              <Rating
                                  name="restaurant_rating"
                                  value={restaurant.r_rating}
                                />
                            </CardBody>
                            <CardFooter chart>
                              <div className={classes.stats}>
                                <LocationOn /> {restaurant.r_longitude}, {restaurant.r_latitude}
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

export default Dashboard;