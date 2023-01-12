import {
  Card,
  Grid,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Component } from "react";
import UserIcon from "@material-ui/icons/AccountCircle";
import LocationIcon from "@material-ui/icons/LocationOn";
import defaultImage from "../assets/images/default-image.jpg";
import { useNavigate } from "react-router-dom";
//import Card from 'react-bootstrap/Card';
//{ data: { name, meet_time, organizer }
function EventCard({
  screenWidth,
  screenHeight,
  id,
  name,
  meet_time,
  organizer,
}) {
  let navigate = useNavigate();
  const maxcCardWidth = screenWidth / 3;
  const maxCardHeight = screenHeight / 3;

  const handleClick = (event) => {
    //TODO: HANDLE VIEWING EVENT
    navigate("/Event/" + id);
  };

  return (
    <Grid item xs={3}>
      <Card sx={{ maxWidth: maxcCardWidth }}>
        <CardActionArea href={"/Event/" + id}>
          <CardMedia
            component="img"
            height="140"
            image={defaultImage}
          ></CardMedia>
          <CardContent>
            <Typography
              gutterBottom
              variant="h1"
              fontSize="20px"
              align="left"
              fontWeight="bold"
              color={"black"}
            >
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontSize="15px">
              <LocationIcon className="locationIcon" />
              Date/Time: {meet_time}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontSize="15px">
              <UserIcon className="userIcon" />
              Organizer: {organizer}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
export default EventCard;
