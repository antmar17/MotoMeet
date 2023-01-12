import Navbar from "../components/Navbar";
//import {
//  Grid,
//  Box,
//  Typography,
//  Container,
//  Rating,
//  TextField,
//} from "@mui/material";
//import OutlinedInput from "@mui/material/OutlinedInput";
import {
  Box,
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Input,
  Alert,
  AlertTitle,
} from "@mui/material";

import { useRef, useState, useEffect, useContext } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TwoWheelerIcon from "@material-ui/icons/TwoWheeler";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { UserContext } from "../context/UserContext";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const USER_URL = "/api/Users/Username";
const EVENT_URL = "/api/Events";
const CreateEventPage = () => {
  let navigate = useNavigate();
  //dates
  const current = new Date();
  const minDate = `${current.getFullYear()}-${
    current.getMonth() + 1
  }-${current.getDate()}`;
  //states
  const [organizerId, setOrganizerId] = useState("");
  const [date, setDate] = useState(dayjs(minDate));
  const [errMsg, setErrMsg] = useState("");
  const [name, setName] = useState("");
  const [distance, setDistance] = useState("");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [rules, setRules] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.post(
        USER_URL,
        JSON.stringify({
          username: localStorage.getItem("username"),
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setOrganizerId(response.data.id);
    } catch (err) {
      console.log(err);
    }
  };
  //styles
  const paperStyle = {
    height: "auto",
    width: "40vw",
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  //refs
  const errRef = useRef();

  //onClick and On focus
  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleCreate = async () => {
    if (!name || !distance || !location || !desc || !rules) {
      setErrMsg("Please input all info");
      errRef.current.focus();
      return;
    }

    try {
      const payload = {
        name: name,
        organizer_id: organizerId,
        meet_time: date,
        meet_location: location,
        distance: distance,
        description: desc,
        rules: rules,
      };

      console.log(JSON.stringify(payload));
      const response = await axios.post(EVENT_URL, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);
      navigate("/MyEvents");
      //setOrganizerId(response.data.id);
    } catch (err) {
      console.log(err);
    }
  };
  const handleTextFocus = () => {
    setErrMsg("");
  };

  return (
    <>
      <Navbar />
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center" paddingTop={3}>
            <Avatar style={avatarStyle}>
              <TwoWheelerIcon></TwoWheelerIcon>
            </Avatar>
            <h2>Host an Event</h2>
          </Grid>
          <Grid container spacing={1} padding={2} align="center">
            {errMsg ? (
              <Grid item xs={12}>
                <Alert severity="error">
                  <AlertTitle align={"left"}>Error</AlertTitle>
                  {errMsg}
                </Alert>
              </Grid>
            ) : (
              <></>
            )}
            <Grid item xs={6}>
              <Typography color="text.secondary" align="left" fontSize={"15px"}>
                Event Name
              </Typography>
              <TextField
                onFocus={() => {
                  setErrMsg("");
                }}
                fullWidth
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                id="outlined-basic"
                variant="outlined"
                placeholder="Enter Event Name"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography color="text.secondary" align="left" fontSize={"15px"}>
                Distance in miles
              </Typography>
              <TextField
                onFocus={handleTextFocus}
                fullWidth
                value={distance}
                onChange={(e) => {
                  setDistance(e.target.value);
                }}
                id="outlined-basic"
                variant="outlined"
                placeholder=" Enter Distance in miles"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography color="text.secondary" align="left" fontSize={"15px"}>
                Meet Up Location
              </Typography>

              <TextField
                fullWidth
                onFocus={handleTextFocus}
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                id="outlined-basic"
                variant="outlined"
                placeholder="Meet Up Location"
              />
            </Grid>
            <Grid item xs={6}>
              <Typography color="text.secondary" align="left" fontSize={"15px"}>
                Meet Up Date/Time
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} align="left">
                <DateTimePicker
                  fullWidth
                  inputFormat="YYYY-MM-DD hh:mm"
                  value={date}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                  minDate={minDate}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Typography color="text.secondary" align="left" fontSize={"15px"}>
                Description
              </Typography>
              <TextField
                fullWidth
                onFocus={handleTextFocus}
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                id="outlined-multiline-static"
                multiline
                rows={4}
                placeholder="Enter Description"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography color="text.secondary" align="left" fontSize={"15px"}>
                Rules
              </Typography>
              <TextField
                fullWidth
                onFocus={handleTextFocus}
                value={rules}
                onChange={(e) => {
                  setRules(e.target.value);
                }}
                id="outlined-multiline-static"
                multiline
                rows={4}
                placeholder="Enter Rules"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleCreate}>
                Create Event
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
};

export default CreateEventPage;
