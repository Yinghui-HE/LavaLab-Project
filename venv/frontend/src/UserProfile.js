import React, { useState, useEffect } from "react";
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

function UserProfile(props) {
  const classes = useStyles();
  console.log("userprofile props: ", props);
  const [userInfo, setUserInfo] = useState({});
  const [prevLocation, setPrevLocation] = useState("");
  const [currLocation, setCurrLocation] = useState("");
  const [locationChange, setLocationChange] = useState(false);

  console.log("userprofile previous loc: ", props.history.location.state.from);
  console.log("userprofile current loc: ", props.history.location.pathname);

//  //create your forceUpdate hook
//    function useForceUpdate(){
//        const [value, setValue] = useState(0); // integer state
//        return () => setValue(value => value + 1); // update the state to force render
//    }
  useEffect(() => {
    setUserInfo(props.data)
    setPrevLocation(props.history.location.state.from);
    setCurrLocation(props.history.location.pathname);
    setLocationChange(prevLocation !== currLocation);
    console.log("location change: ", locationChange)
  }, [props.data, props.history.location.state.from, props.history.location.pathname, locationChange, currLocation, prevLocation]);


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
                <img src={userInfo.pic_url} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h2 className={classes.cardTitle}>{userInfo.name}</h2>
              <h4 className={classes.cardCategory}>2 Followers</h4>
              <h4 className={classes.cardCategory}>1 Following</h4>
              <p className={classes.description}>
                <LocationOn />{userInfo.location}
              </p>
              <Button color="primary" round>
                {userInfo.email}
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      </div>
    </div>
  );
}

export default UserProfile;