import Navbar from "../components/Navbar";
import { Grid, Box, Typography, Container, Rating } from "@mui/material";
import { GridList, ImageList, GridListTile, Divider } from "@material-ui/core";
import React from "react";
import axios from "../api/axios";

import RatingCard from "../components/RatingCard";
import EventTileCard from "../components/EventTileCard";
import { useState, useEffect } from "react";
const HOSTED_URL = "/api/Events/Organizer";
const ATTENDING_URL = "/api/Events/Participant";
const USERNAME_URL = "/api/Users/Username";
const MyEventsPage = () => {
  //states
  const [hostedEvents, setHostedEvents] = useState([]);
  const [attendingEvents, setAttendingEvents] = useState([]);

  //styles
  const paperStyle = {
    height: "auto",
    width: "40vw",
    margin: "20px auto",
  };
  useEffect(() => {
    fetchHosted();
    fetchAttending();
  }, []);

  //fetches
  const fetchUserId = async () => {
    let userId = "";
    try {
      const response = await axios.post(
        USERNAME_URL,
        JSON.stringify({
          username: localStorage.getItem("username"),
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      userId = response.data.id;
    } catch (err) {
      console.log(err);
    }
    console.log(userId);

    return userId;
  };

  const fetchName = async (userId) => {
    var user = "";
    try {
      const response = await axios.post(
        "/api/Users/Userid",
        JSON.stringify({
          value: userId,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(response.data);
      user = response.data.username;
    } catch (err) {
      console.log(err);
    }
    console.log(user);
    return user;
  };
  const fetchHosted = async () => {
    const userId = await fetchUserId();

    try {
      const response = await axios.post(
        HOSTED_URL,
        JSON.stringify({
          value: userId,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      var newList = [];
      for (var i = 0; i < response.data.length; i++) {
        const newItem = response.data[i];
        const newOrg = await fetchName(response.data[i].organizer_id);
        newItem.organizer_id = newOrg;
        newList.push(newItem);
        console.log(newItem);
      }
      setHostedEvents(newList);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAttending = async () => {
    const userId = await fetchUserId();

    try {
      const response = await axios.post(
        ATTENDING_URL,
        JSON.stringify({
          value: userId,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      var newList = [];
      const oldList = response.data[0];
      for (var i = 0; i < oldList.length; i++) {
        const newItem = oldList[i];
        const newOrg = await fetchName(oldList[i].organizer_id);
        newItem.organizer_id = newOrg;
        newList.push(newItem);
        console.log(newItem);
      }
      //console.log(response.data);
      setAttendingEvents(newList);
    } catch (err) {
      console.log(err);
    }
  };

  const FormHostedEvents = ({ title }) => {
    var elements = [];

    for (var i = 0; i < hostedEvents.length; i++) {
      let event = hostedEvents[i];

      elements.push(
        <EventTileCard
          id={event.id}
          name={event.name}
          meet_time={event.meet_time}
          organizer={event.organizer_id}
        />
      );
    }
    return (
      <React.Fragment>
        <Container fixed maxWidth="40vw">
          <Typography variant="h2" color={"text.primary"} fontSize={"50px"}>
            {title}
          </Typography>
          <Box
            sx={{
              p: "2",
              width: "40vw",
              height: "90vh",
              border: 1,
              borderColor: "text.primary",
            }}
          >
            <GridList
              spacing={1}
              cols={1}
              style={{ width: "39w", height: "90vh" }}
            >
              {elements}
            </GridList>
          </Box>
        </Container>
      </React.Fragment>
    );
  };

  const FormAttendingEvents = ({ title }) => {
    var elements = [];

    for (var i = 0; i < attendingEvents.length; i++) {
      let event = attendingEvents[i];
      console.log(event);
      //console.log(event[i].id);
      try {
        elements.push(
          <EventTileCard
            id={event.id}
            name={event.name}
            meet_time={event.meet_time}
            organizer={event.organizer_id}
          />
        );
      } catch (err) {}
    }
    return (
      <React.Fragment>
        <Container fixed maxWidth="40vw">
          <Typography variant="h2" color={"text.primary"} fontSize={"50px"}>
            {title}
          </Typography>
          <Box
            sx={{
              width: "40vw",
              height: "90vh",
              border: 1,
              borderColor: "text.primary",
            }}
          >
            <GridList style={{ width: "39w", height: "90vh" }}>
              {elements}
            </GridList>
          </Box>
        </Container>
      </React.Fragment>
    );
  };

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={6}>
          <FormHostedEvents title={"Event You are Hosting"} />
        </Grid>
        <Grid item xs={6}>
          <FormAttendingEvents title={"Events You are Attending"} />
        </Grid>
      </React.Fragment>
    );
  }

  //<React.Fragment>
  //  <Grid item xs={6}>
  //    <FormHostedEvents title={"Event You are Hosting"} />
  //  </Grid>
  //  <Grid item xs={6}>
  //    <FormHostedEvents title={"Events You are Attending"} />
  //  </Grid>
  //</React.Fragment>

  return (
    <>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,

          border: 1,
          borderColor: "text.primary",
        }}
        padding={5}
      >
        <Grid container spacing={1}>
          <Grid container item spacing={3}>
            <FormRow />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MyEventsPage;
