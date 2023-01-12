import Navbar from "../components/Navbar";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
} from "@mui/material";

import Calender from "@material-ui/icons/CalendarToday";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Location from "@material-ui/icons/LocationOn";
import People from "@material-ui/icons/People";
import City from "@material-ui/icons/LocationCity";
import axios from "../api/axios";

import React, { useState, useEffect } from "react";

import defaultImage from "../assets/images/default-image.jpg";

import { useNavigate, useParams } from "react-router-dom";
const EVENT_URL = "/api/Events/Specific";
const USER_URL = "/api/Users/Userid";
const USERNAME_URL = "/api/Users/Username";
const ORG_URL = "/api/Organizer";

const ViewEventPage = () => {
  let navigate = useNavigate();
  //states

  const [isOrganizer, setIsOrganizer] = useState(true);

  const [meetLocation, setMeetLocation] = useState("");
  const [meetTime, setMeetTime] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [distance, setDistance] = useState("");
  const [numPar, setNumPar] = useState(0);
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [rules, setRules] = useState("");

  const { id } = useParams();

  useEffect(() => {
    fetchEvent();
    fetchPar();
  }, []);

  const fetchEvent = async () => {
    try {
      const response = await axios.post(
        EVENT_URL,
        JSON.stringify({
          value: id,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setName(response.data.name);
      setMeetTime(response.data.meet_time);
      setMeetLocation(response.data.meet_location);
      setDistance(response.data.distance);
      setRules(response.data.rules);
      setDesc(response.data.description);
      fetchOrg(response.data.organizer_id);
      setIsOrganizer(organizer === localStorage.getItem("username"));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOrg = async (orgId) => {
    try {
      const response = await axios.post(
        USER_URL,
        JSON.stringify({
          value: orgId,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setOrganizer(response.data.username);
      console.log(isOrganizer);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPar = async () => {
    try {
      const response = await axios.post(
        ORG_URL,
        JSON.stringify({
          value: id,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setNumPar(response.data["0"].length);
    } catch (err) {
      console.log(err);
    }
  };

  const handleJoin = async () => {
    let userId = await fetchUserId();
    console.log(userId);
    try {
      const response = await axios.post(
        "/api/Organizer/" + id,
        JSON.stringify({
          value: userId,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      navigate("/MyEvents");
    } catch (err) {
      console.log(err);
    }
  };

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
  //styles
  const paperStyle = {
    height: "auto",
    width: "90vw",
    margin: "20px auto",
  };

  const FormPicture = () => {
    return (
      <React.Fragment>
        <Typography variant="h2" color={"grey"} fontSize={50}>
          {name}
        </Typography>
        <Box
          component="img"
          sx={{
            width: "100%",
            height: "40vh",
            border: 1,
            borderColor: "black",
          }}
          src={defaultImage}
          alt="TITLE HERE"
        ></Box>
      </React.Fragment>
    );
  };

  const FormInfo = () => {
    return (
      <React.Fragment>
        <Typography variant="h2" color={"white"} fontSize={50}>
          HI
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="input-with-icon-textfield"
              label="Meet Location"
              defaultValue={meetLocation}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <City />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="input-with-icon-textfield"
              label="Meet Date/ Time"
              defaultValue={meetTime}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Calender />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <Link
              onClick={() => {
                navigate("/Profile/" + organizer);
              }}
            >
              <TextField
                fullWidth
                id="input-with-icon-textfield"
                label="Organizer"
                defaultValue={organizer}
                InputProps={{
                  readOnly: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </Link>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="input-with-icon-textfield"
              label="Distance"
              defaultValue={distance}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Location />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="input-with-icon-textfield"
              label="Number of Participants"
              defaultValue={numPar}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <People />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  };

  const FormDesc = () => {
    return (
      <React.Fragment>
        <Typography variant="subtitle1" fontSize={30}>
          Description
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "35vh",
            border: 1,
            borderColor: "black",
          }}
        >
          <TextField
            fullWidth
            id="filled-multiline-static"
            multiline
            rows={11.5}
            defaultValue={desc}
            variant="filled"
            inputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </React.Fragment>
    );
  };
  const FormRules = () => {
    return (
      <React.Fragment>
        <Typography variant="subtitle1" fontSize={30}>
          Rules
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "35vh",
            border: 1,
            borderColor: "black",
          }}
        >
          <TextField
            fullWidth
            id="filled-multiline-static"
            multiline
            rows={11.5}
            defaultValue={rules}
            variant="filled"
            inputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </React.Fragment>
    );
  };

  const FormJoinBtn = () => {
    return (
      <React.Fragment>
        <Button variant="contained" onClick={handleJoin} fullWidth>
          JOIN EVENT
        </Button>
      </React.Fragment>
    );
  };

  const FormViewBtn = () => {
    return (
      <React.Fragment>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/ViewParticipants/" + id);
          }}
          fullWidth
        >
          View Participants
        </Button>
      </React.Fragment>
    );
  };
  return (
    <div>
      <Navbar />
      <Paper elevation={10} style={paperStyle}>
        <Grid container spacing={3} padding={2}>
          <Grid item xs={6}>
            <FormPicture />
          </Grid>

          <Grid item xs={6}>
            <FormInfo />
          </Grid>

          <Grid item xs={6}>
            <FormDesc />
          </Grid>

          <Grid item xs={6}>
            <FormRules />
          </Grid>

          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            {organizer === localStorage.getItem("username") ? (
              <FormViewBtn />
            ) : (
              <FormJoinBtn />
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ViewEventPage;
