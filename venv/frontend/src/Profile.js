import React from "react";
//import axios from 'axios';

function Profile(props) {
    console.log("userIDDDD:", props.data)
    const userID = props.data;

//    if (userID !== -1) {
//        getUserInfo();
//    }

//    function getUserInfo() {
//        axios({
//              url: '/profile',
//              method: 'POST',
//              headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json;charset=UTF-8'
//              },
//              data: {
//                userID: {userID},
//              }
//            })
//            .then(response => {
//                console.log(response);
//                if (response.data.status === "Success") {
//                    console.log(response);
//
////                    console.log("props: ", props)
//                }
//            })
//            .catch(error => console.error('timeout exceeded'))
//    }

    return (
        <h1>userID: {userID}</h1>

    );
};

export default Profile;