import Navbar from "../components/Navbar.js";
import SearchBar from "../components/SearchBar.js";
//import { Grid, GridList, GridListTile } from "@material-ui/core";
import { useWindowDimensions } from "react-native";
import EventCard from "../components/EventCard.js";
import Box from "@material-ui/core/Box";
import { useRef, useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner.js";
import "../assets/css/LandingPage.css";
import axios from "../api/axios.js";
import { Grid } from "@mui/material";

const EVENTS_URL = "/api/Events";
const LandingPage = () => {
  //events objects will be here
  var results = [];
  const width = useWindowDimensions.width;
  const height = useWindowDimensions.height;
  //states
  const [latLong, setLatLong] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [eventList, setEventList] = useState([]);
  const data = "";
  //get height and width of user screen

  useEffect(() => {
    createEvents();
  }, []);

  const getLongLat = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLatLong(position.coords.latitude + "," + position.coords.longitude);
    });
  };

  // const getAddress = async (e) => {
  //   //console.log("LOCATION: " + location);

  //   const key = "aB0TX487EDQc7t9OhhY71hezDwNlvLbm";

  //   const url =
  //     "http://www.mapquestapi.com/geocoding/v1/reverse?key=" +
  //     key +
  //     "&location=" +
  //     latLong +
  //     "&includeRoadMetadata=true&includeNearestIntersection=true";

  //   const response = await axios.get(url);
  //   setIsLoading(false);
  //   console.log(response.data);
  // };

  //create events in are
  const createEvents = async (e) => {
    setIsLoading(true);
    var events = [];
    try {
      const response = await axios.get(EVENTS_URL);
      console.log(response);
      const n = response.data.length;
      for (var i = 0; i < n; i++) {
        const eventData = response.data[i];
        console.log(eventData);
        let parsedDT = eventData["meet_time"].toString().replace("T", "/");
        const element = (
          <EventCard
            id={eventData.id}
            screenWidth={width}
            screenHeight={height}
            name={eventData["name"]}
            meet_time={parsedDT}
            organizer={eventData["organizer"]}
          />
        );
        events.push(element);
      }
    } catch (err) {
      console.log(err);
      for (var i = 0; i < 100; i++) {
        const element = (
          <EventCard
            screenWidth={width}
            screenHeight={height}
            name="TITLE"
            meet_time="MEET TIME"
            organizer="ORGANIZER"
          />
        );
        events.push(element);
      }
    }
    setIsLoading(false);
    setEventList(events);
  };

  return (
    <div id="Landing">
      <Navbar />

      <SearchBar placeholder={"Enter Zipcode"} data={data}></SearchBar>
      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <Grid container spacing={4}>
              {eventList}
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
