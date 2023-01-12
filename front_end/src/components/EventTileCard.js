import {
  Card,
  Grid,
  Box,
  Typography,
  Container,
  Rating,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import {
  GridList,
  ImageList,
  GridListTile,
  Divider,
  CardContent,
} from "@material-ui/core";
import UserIcon from "@material-ui/icons/AccountCircle";
import defaultIcon from "../assets/images/default-image.jpg";
const EventTileCard = ({ id, name, meet_time, organizer }) => {
  return (
    <GridListTile style={{ height: "auto", width: "40vw" }}>
      <Card style={{ height: "auto" }}>
        <CardContent>
          <CardActionArea href={"/Event/" + id}>
            <Grid container>
              <Grid item xs={5}>
                <Typography
                  sx={{
                    color: "black",
                  }}
                >
                  Event Name: {name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontSize="18px"
                  paddingLeft={1}
                >
                  Meet time: {meet_time}
                </Typography>
              </Grid>
            </Grid>

            <Typography
              variant="body2"
              color="text.secondary"
              fontSize="18px"
              paddingLeft={1}
            >
              Organizer: {organizer}
            </Typography>
          </CardActionArea>
          <Divider />
        </CardContent>
      </Card>
    </GridListTile>
  );
};

export default EventTileCard;
