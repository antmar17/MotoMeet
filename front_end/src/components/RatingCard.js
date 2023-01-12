import {
  Card,
  Grid,
  Box,
  Typography,
  Container,
  Rating,
  CardActionArea,
} from "@mui/material";
import {
  GridList,
  ImageList,
  GridListTile,
  Divider,
  CardContent,
} from "@material-ui/core";
import UserIcon from "@material-ui/icons/AccountCircle";
const RatingCard = ({ authorName, score, description, date }) => {
  return (
    <GridListTile style={{ height: "auto", width: "100%" }}>
      <Card>
        <CardContent>
          <Rating name="read-only" value={score} size={"small"} readOnly />
          <Grid container>
            <Grid item xs={1} paddingLeft={1}>
              <UserIcon className="userIcon" />
            </Grid>
            <Grid item xs={3}>
              <CardActionArea href={"/Profile/" + authorName}>
                <Typography
                  sx={{
                    color: "#18A0FB",
                  }}
                >
                  {authorName}
                </Typography>
              </CardActionArea>
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant="body2"
                color="text.secondary"
                fontSize="18px"
                paddingLeft={1}
              >
                {date}
              </Typography>
            </Grid>
          </Grid>

          <Typography
            variant="body2"
            color="text.secondary"
            fontSize="18px"
            paddingLeft={1}
          >
            {description}
          </Typography>
          <Divider />
        </CardContent>
      </Card>
    </GridListTile>
  );
};

export default RatingCard;
