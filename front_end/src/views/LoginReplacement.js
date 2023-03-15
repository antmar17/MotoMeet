import { useState } from "react";
import {
  TextField,
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Link,
  FormControlLabel,
  Checkbox,
  Alert,
  AlertTitle,
} from "@mui/material";

import {axios,LOGIN_URL} from "../api/axios";


const LoginPageReplacement = () => {
  const [errMsg, setErrMsg] = useState("");

  /*handles submition of log in information*/
  const handleSignIn = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") === "" || data.get("password") === "") {
      setErrMsg("Please enter all information");
      console.log(LOGIN_URL)
      return;
    }
    //TODO: send request to the server
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 15,
          }}
        >
          <Typography component="h1" variant="h3">
            MotoMeet
          </Typography>

          <Box
            sx={{
              marginTop: 2,
            }}
          ></Box>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {errMsg ? (
            <Alert
              sx={{ width: "100%" }}
              severity="error"
              onClose={() => {
                setErrMsg("");
              }}
            >
              <AlertTitle>
                <strong>Error</strong>
              </AlertTitle>
              {errMsg}
            </Alert>
          ) : (
            <></>
          )}
          <Box
            component="form"
            onSubmit={handleSignIn}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary"></Checkbox>}
              label="Remember me"
            ></FormControlLabel>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginPageReplacement;
