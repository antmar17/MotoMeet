import Navbar from "../components/Navbar";
import ParticipantCard from "../components/ParticiapntCard.js";
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

import { GridList, ImageList, GridListTile, Divider } from "@material-ui/core";
import ListSubheader from "@material-ui/core/ListSubheader";
//icons
import Calender from "@material-ui/icons/CalendarToday";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Location from "@material-ui/icons/LocationOn";
import People from "@material-ui/icons/People";
import City from "@material-ui/icons/LocationCity";

import React, { useEffect, useState } from "react";

import defaultImage from "../assets/images/default-image.jpg";

import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
const PAR_URL = "/api/Organizer";
const ViewParticipantsPage = () => {
  const [participants, setParticipants] = useState([]);
  //styles
  const paperStyle = {
    height: "auto",
    width: "90vw",
    margin: "20px auto",
  };

  const boxStyle = {
    p: "2",
    width: "100%",
    height: "90vh",
  };
  const { event_id } = useParams();

  const handleDelete = async (username) => {
    const url = PAR_URL + "/" + event_id;
    console.log(url);
    try {
      const response = await axios.delete(url, {
        data: { username: username },
      });

      const newList = participants.filter((par) => par.username != username);
      setParticipants(newList);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPar();
  }, []);

  const fetchPar = async () => {
    try {
      const response = await axios.post(
        PAR_URL,
        JSON.stringify({
          value: event_id,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const data = response.data["0"];
      console.log(data);
      setParticipants(data);
    } catch (err) {
      console.log(err);
    }
  };

  const formParticipants = () => {
    fetchPar();
    var elements = [];
    for (var i = 0; i < 100; i++) {
      if (i % 2 === 1) {
        elements.push({ username: "antmar17", avgScore: 1 });
      } else {
        elements.push({
          username: "wes123",
          avgScore: 3,
        });
      }
    }
    return elements;
  };
  return (
    <>
      <Navbar />
      <Paper style={paperStyle} elevation={10}>
        <Box sx={boxStyle} padding={5}>
          <GridList
            spacing={1}
            cols={1}
            style={{ width: "39w", height: "90vh" }}
          >
            <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
              <ListSubheader component="div" fontSize={50}>
                Your participants
              </ListSubheader>
            </GridListTile>

            {participants.map((item, index) => {
              return (
                <React.Fragment>
                  <ParticipantCard
                    username={item.username}
                    avgScore={item.average_rating}
                    handleClick={handleDelete}
                  ></ParticipantCard>
                </React.Fragment>
              );
            })}
          </GridList>
        </Box>
      </Paper>
    </>
  );
};
export default ViewParticipantsPage;
