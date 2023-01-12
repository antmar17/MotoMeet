import Navbar from "../components/Navbar";

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
  InputLabel,
  Rating,
  InputAdornment,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axios";

const REVIEW_URL = "/api/Reviews/Create";
const USERNAME_URL = "/api/Users/Username";

const ReviewPage = () => {
  //hooks
  let navigate = useNavigate();
  const { target_username } = useParams();

  //states
  const [score, setScore] = useState(5);
  const [desc, setDesc] = useState("");
  //styles
  const paperStyle = {
    height: "auto",
    width: "90vw",
    margin: "20px auto",
  };

  const fetchUserId = async (username) => {
    let userId = "";
    try {
      const response = await axios.post(
        USERNAME_URL,
        JSON.stringify({
          username: username,
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
  const handleCreateReview = async () => {
    const author = await fetchUserId(localStorage.getItem("username"));
    const target = await fetchUserId(target_username);
    try {
      const response = await axios.post(
        REVIEW_URL,
        JSON.stringify({
          author_id: author,
          target_id: target,
          description: desc,
          rating: score,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      navigate("/Profile/" + target_username);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar />
      <Paper elevation={10} style={paperStyle}>
        <Grid
          container
          spacing={3}
          padding={5}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography variant="h2" alignItems={"center"}>
              {"RATE " + target_username}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Rating
              size="large"
              name="size-large"
              value={score}
              onChange={(e) => {
                setScore(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                width: "80vw",
                height: "35vh",
                border: 1,
                borderColor: "black",
              }}
            >
              <TextField
                fullWidth
                id="filled-multiline-static"
                required
                multiline
                label="Describe your experience"
                rows={11.5}
                defaultValue={desc}
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                variant="filled"
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleCreateReview}
              fullWidth
              padding={2}
            >
              Submit Review
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default ReviewPage;
