import React, {useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "./Components/Grid/GridItem.js";
import GridContainer from "./Components/Grid/GridContainer.js";
//import CustomInput from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Card from "./Components/Card/Card.js";
import CardHeader from "./Components/Card/CardHeader.js";
import CardAvatar from "./Components/Card/CardAvatar.js";
import CardBody from "./Components/Card/CardBody.js";
import CardFooter from "./Components/Card/CardFooter.js";
import CardIcon from "./Components/Card/CardIcon.js";
import Rating from '@material-ui/lab/Rating';

import LeftDrawer from "./Components/SideDrawer/LeftDrawer.js"
import LocationOn from "@material-ui/icons/LocationOn";
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Restaurant from "./Restaurant.js"

import axios from 'axios';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  profileGrid: {
    margin: "100px 0px 400px 150px",
    width: "unset"
  }
};

const useStyles = makeStyles(styles);

function Follower(props) {
  const classes = useStyles();
  console.log("follower props: ", props);
  const [followerInfo, setFollowerInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [followerRestaurants, setFollowerRestaurants] = useState([]);
//  const [prevLocation, setPrevLocation] = useState("");
//  const [currLocation, setCurrLocation] = useState("");
//  const [locationChange, setLocationChange] = useState(false);

//  console.log("restaurant previous loc: ", props.history.location.state.from);
//  console.log("restaurant current loc: ", props.history.location.pathname);

//  //create your forceUpdate hook
//    function useForceUpdate(){
//        const [value, setValue] = useState(0); // integer state
//        return () => setValue(value => value + 1); // update the state to force render
//    }

  const [restaurantRedirect, setRestaurantRedirect] = useState(false);
  const [restaurantInfo, setRestaurantInfo] = useState(-1);
  const [userRestaurants, setUserRestaurants] = useState([]);

  useEffect(() => {
    setFollowerInfo(props.data.followerInfo);
    setUserInfo(props.data.userInfo);
    setUserRestaurants(props.data.userRestaurants);
    getFollowerRestaurants();

    function getFollowerRestaurants() {
        axios({
              url: '/dashboard',
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
              },
              data: {
                userID: followerInfo.follower_id,
              }
            })
            .then(response => {
                console.log(response);
                if (response.data.status === "Success") {
//                    console.log("restaurants: ", response.data.restaurants);
//                    setRestaurants(response.data.restaurants);
                    console.log("follower restaurants: ", response.data.restaurants);
                    setFollowerRestaurants(response.data.restaurants)

                    console.log("followers props:", props);
                }
            })
            .catch(error => console.error('timeout exceeded'))
    }
  }, [props.data, followerInfo.follower_id, props]);
//


//  if(prevLocation !== currLocation) {
//        useForceUpdate();
//    }
  if (restaurantRedirect) {
    console.log("restaurantRedirect: ", restaurantRedirect);
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
      <LeftDrawer userInfo={userInfo} />
      <div className={classes.profileGrid}>


      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={followerInfo.follower_pic_url} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h2 className={classes.cardTitle}>{followerInfo.follower_name}</h2>
              <h4 className={classes.cardCategory}>4 Followers</h4>
              <h4 className={classes.cardCategory}>6 Followers</h4>

              <p className={classes.description}>
                <LocationOn />{followerInfo.follower_location}
              </p>
              <Button color="primary" round>
                See {followerInfo.follower_name}'s Restaurants
              </Button>
            </CardBody>
          </Card>
        </GridItem>

                {followerRestaurants.map(restaurant => (
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
}

export default Follower;