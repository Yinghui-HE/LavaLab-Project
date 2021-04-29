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
//import CardHeader from "./Components/Card/CardHeader.js";
import CardAvatar from "./Components/Card/CardAvatar.js";
import CardBody from "./Components/Card/CardBody.js";
//import CardFooter from "./Components/Card/CardFooter.js";

import LeftDrawer from "./Components/SideDrawer/LeftDrawer.js"
import LocationOn from "@material-ui/icons/LocationOn";
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

function Restaurant(props) {
  const classes = useStyles();
  console.log("restaurant props: ", props);
  const [restaurantInfo, setRestaurantInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [userRestaurants, setUserRestaurants] = useState([]);
  const [followingButtonText, setFollowingButtonText] = useState('Add to my restaurant list');
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
  useEffect(() => {
    setRestaurantInfo(props.data.restaurantInfo);
    setUserInfo(props.data.userInfo);
    setUserRestaurants(props.data.userRestaurants);
    checkFollowingStatus();

    function checkFollowingStatus () {
    var i;
    console.log("check following status: ", restaurantInfo, userRestaurants);
    for (i=0; i<userRestaurants.length; i++) {
        if (userRestaurants[i].r_id === restaurantInfo.r_id) {
            setFollowingButtonText('Following');
            console.log("in the list with r_id: ", restaurantInfo.r_id);
            break;
        }
    }
  }

  }, [props.data, restaurantInfo, userRestaurants]);

  function addToMyList() {
    axios({
      url: '/restaurant',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        userID: userInfo.user_id,
        restaurantID: restaurantInfo.r_id
      }
    })
    .then(response => {
        console.log(response);
        if (response.data.status === "Success") {
            alert("successfully add ", restaurantInfo.r_name, "to my restaurant list");
        }
    })
    .catch(error => console.error('timeout exceeded'))
  }
//

//  if(prevLocation !== currLocation) {
//        useForceUpdate();
//    }

  return (

    <div id="left_drawer">
      <LeftDrawer userInfo={userInfo} />
      <div className={classes.profileGrid}>


      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={restaurantInfo.r_pic_url} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h2 className={classes.cardTitle}>{restaurantInfo.r_name}</h2>
              <h4 className={classes.cardCategory}>46 Followers</h4>
              <p className={classes.description}>
                <LocationOn />{restaurantInfo.r_address}
              </p>
              <Button color="primary" round onClick={() => { addToMyList(); }}>
                {followingButtonText}
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      </div>
    </div>
  );
}

export default Restaurant;