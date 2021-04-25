import React, { useState, useEffect } from "react";
import axios from 'axios';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
//import Store from "@material-ui/icons/Store";
//import Warning from "@material-ui/icons/Warning";
//import DateRange from "@material-ui/icons/DateRange";
//import LocalOffer from "@material-ui/icons/LocalOffer";
//import Update from "@material-ui/icons/Update";
//import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
//import Accessibility from "@material-ui/icons/Accessibility";
//import BugReport from "@material-ui/icons/BugReport";
//import Code from "@material-ui/icons/Code";
//import Cloud from "@material-ui/icons/Cloud";
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

const useStyles = makeStyles(styles);


function Dashboard(props) {
    console.log("userIDDDD:", props.data)
    const userID = props.data;
    const classes = useStyles();
    const [restaurants, setRestaurants] = useState([]);
//    const [user, setUser] = useState([]);

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
                    console.log(response.data.restaurants);
//                    setData(response.data.restaurants);
                    setRestaurants(response.data.restaurants);
//                    console.log(restaurants[5])
//                    console.log("data", data)
//                    console.log("props: ", props)
                }
            })
            .catch(error => console.error('timeout exceeded'))
    }

    }, [userID]);



    return (
        <div>
          <GridContainer>
            {restaurants.map(restaurant => (
                <GridItem xs={12} sm={12} md={4}>
                  <Card>
                    <CardHeader color="warning" stats icon>
                      <CardIcon color="warning">
                        <Icon src="{restaurant.r_pic_url}">{restaurant.r_name}</Icon>
                      </CardIcon>
                    </CardHeader>
                  <CardBody>
                      <h4 className={classes.cardTitle}>Completed Tasks</h4>
                      <p className={classes.cardCategory}>Last Campaign Performance</p>
                    </CardBody>
                    <CardFooter chart>
                      <div className={classes.stats}>
                        <AccessTime /> campaign sent 2 days ago
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
            ))}
          </GridContainer>
        </div>
    );
};

export default Dashboard;