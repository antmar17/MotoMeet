import Navbar from "../components/Navbar";
import RatingCard from "../components/RatingCard.js";
import defaultProfile from "../assets/images/default-profile.jpg";
import { Button } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { Grid, Box, Typography, Container, Rating } from "@mui/material";
import { GridList, ImageList, GridListTile, Divider } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
//import axios from "axios";
import Cookies from "js-cookie";

const USER_URL = "/api/Users/Username";
const REVIEW_URL = "/api/Reviews";

const USERID_URL = "/api/Users/Userid";

const ProfilePage = () => {
  const [score, setScore] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [isUser, setIsUser] = useState(false);
  const { username } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    setIsUser(username === localStorage.getItem("username"));
    fetchUser();
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [id]);

  useEffect(() => {}, [reviews]);
  const fetchUser = async () => {
    try {
      const response = await axios.post(
        USER_URL,
        JSON.stringify({
          username: username,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setId(response.data.id);
      setEmail(response.data.email);
      setName(response.data.name);
      setScore(response.data.average_rating);
    } catch (err) {
      console.log(err);
    }
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
  const fetchReviews = async () => {
    console.log("ID " + id);
    try {
      const response = await axios.post(
        REVIEW_URL,
        JSON.stringify({ value: id }),

        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      var newList = [];
      for (var i = 0; i < response.data.length; i++) {
        const newItem = response.data[i];
        const newAuthorId = await fetchName(response.data[i].author_id);
        newItem.author_id = newAuthorId;
        newList.push(newItem);
        console.log(newItem);
      }
      setReviews(newList);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const FormReviews = () => {
    var elements = [];
    for (var i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      elements.push(
        <RatingCard
          authorName={review.author_id}
          score={review.rating}
          description={review.description}
          date={"2022-10-05"}
        />
      );
    }
    return (
      <React.Fragment>
        <GridList
          spacing={2}
          cols={1}
          style={{ width: "40vw", height: "20vw" }}
        >
          {elements}
        </GridList>
      </React.Fragment>
    );
  };

  function FormAvgRating() {
    return (
      <React.Fragment>
        <Grid item xs={6}>
          <Container fixed maxWidth="40vw">
            <Box
              sx={{
                p: "2",
                width: "40vw",
                height: "20vw",
                border: 1,
                borderColor: "text.primary",
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={5}
              >
                <Grid item xs={12}>
                  <Typography
                    color={"text.secondary"}
                    paddingTop={"5vw"}
                    fontSize={"40px"}
                  >
                    Your Average Rating
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Rating
                    name="read-only"
                    value={score}
                    size={"large"}
                    readOnly
                  />
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Grid>
      </React.Fragment>
    );
  }

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={6}>
          <Typography
            variant={"h1"}
            color={"black"}
            fontSize="30px"
            align="left"
            paddingLeft={5}
          >
            REVIEWS
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant={"h1"}
            color={"black"}
            fontSize="30px"
            align="Left"
            paddingLeft={5}
          >
            AVG RATING
          </Typography>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <div>
      <Navbar></Navbar>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs>
          <div>
            <img
              style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={defaultProfile}
            />
          </div>
        </Grid>

        <Grid item xs>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              navigate("/Review/" + username);
            }}
          >
            {isUser ? "Upload Picture" : "Write Review"}
          </Button>
        </Grid>
      </Grid>

      <div
        style={{
          margin: "18px 0px",
          borderBottom: "1px solid grey",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      ></div>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={1}>
          <Typography variant={"h1"} color={"black"} fontSize="30px">
            Username:
          </Typography>
        </Grid>

        <Grid item xs={2.5}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 300,
              height: 50,
              backgroundColor: "text.disabled",
            }}
          >
            <Typography>{username}</Typography>
          </Box>
        </Grid>
        <Grid item xs={0.75}>
          <Typography variant={"h1"} color={"black"} fontSize="30px">
            Name:
          </Typography>
        </Grid>

        <Grid item xs={2.5}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 300,
              height: 50,
              backgroundColor: "text.disabled",
            }}
          >
            <Typography>{name}</Typography>
          </Box>
        </Grid>

        <Grid item xs={0.75}>
          <Typography variant={"h1"} color={"black"} fontSize="30px">
            Email:
          </Typography>
        </Grid>

        <Grid item xs={2.5}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 300,
              height: 50,
              backgroundColor: "text.disabled",
            }}
          >
            <Typography>{email}</Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={1} paddingTop={2}>
        <FormRow></FormRow>
        <Grid item xs={6}>
          <Container fixed maxWidth="40vw">
            <Box
              sx={{
                p: "2",
                width: "40vw",
                height: "20vw",

                border: 1,
                borderColor: "text.primary",
              }}
            >
              <FormReviews />
            </Box>
          </Container>
        </Grid>
        <FormAvgRating />
      </Grid>
    </div>
  );
};

//      <Grid
//        item
//        xs={3}
//        paddingLeft={5}
//        justifyContent={"center"}
//        alignItems="center"
//      >
//<Box
//  sx={{
//    width: "40vw",
//    height: "20vw",
//
//    backgroundColor: "text.disabled",
//  }}
//></Box>;
//      </Grid>
export default ProfilePage;
