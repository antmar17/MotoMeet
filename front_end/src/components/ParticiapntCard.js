import {
  Card,
  CardActions,
  Grid,
  Box,
  Typography,
  Container,
  Rating,
  CardActionArea,
  IconButton,
} from "@mui/material";
import {
  GridList,
  ImageList,
  GridListTile,
  Divider,
  CardContent,
} from "@material-ui/core";
import UserIcon from "@material-ui/icons/AccountCircle";
import DeleteIcon from "@material-ui/icons/Close";
const ParticipantCard = ({ username, avgScore, handleClick }) => {
  return (
    <GridListTile style={{ height: "auto", width: "100%" }}>
      <Card>
        <CardContent>
          <Typography
            sx={{
              color: "grey",
            }}
          >
            Avg Score
          </Typography>
          <Rating name="read-only" value={avgScore} size={"small"} readOnly />
          <Grid container>
            <Grid item xs={1} paddingLeft={1}>
              <UserIcon className="userIcon" />
            </Grid>
            <Grid item xs={3}>
              <CardActionArea href={"/Profile/" + username}>
                <Typography
                  sx={{
                    color: "#18A0FB",
                  }}
                >
                  {username}
                </Typography>
              </CardActionArea>
            </Grid>

            <Grid item xs={0.5}>
              <Typography
                sx={{
                  color: "grey",
                }}
              >
                Kick
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <CardActions>
                <IconButton
                  aria-label="delete"
                  size="large"
                  sx={{
                    backgroundColor: "transparet",
                    color: "red",
                    md: "20px",
                  }}
                  onClick={(event) => handleClick(username)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Grid>
          </Grid>

          <Divider />
        </CardContent>
      </Card>
    </GridListTile>
  );
};

export default ParticipantCard;
