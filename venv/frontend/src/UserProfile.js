import React from "react";
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
    margin: "100px 0px 0px 150px",
    width: "unset"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile(props) {
  const classes = useStyles();
  console.log("userprofile props: ", props)

  return (
    <div id="left_drawer">
      <LeftDrawer />
      <div className={classes.profileGrid}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src="https://media-exp1.licdn.com/dms/image/C5603AQFeTsbkfHJ52w/profile-displayphoto-shrink_800_800/0/1562689531347?e=1625097600&v=beta&t=rX0JQBqcXNTtuDSDPVoNbTs1Br6U52kJS-0k5-fAyis" alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      </div>
    </div>
  );
}