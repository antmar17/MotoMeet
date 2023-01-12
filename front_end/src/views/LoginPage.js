import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/LoginPage.css";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import { UserContext } from "../context/UserContext";
//import styles here
const LOGIN_URL = "/api/Login";

const LoginPage = () => {
  let navigate = useNavigate();
  //const { setAuth } = useContext(AuthContext);
  const { setAuth } = useContext(UserContext);
  //refs
  const userRef = useRef();
  const errRef = useRef();

  //states
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  //Subroutine for logIn button press
  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          username: user,
          password: pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      //set auth state
      const accessToken = response?.data?.Jwt;
      localStorage.setItem("username", user);
      setAuth({ user, pwd });

      setUser("");
      setPwd("");
      setSuccess(true);
      navigate("/Landing");
    } catch (err) {
      //if no response
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err?.response == 400) {
        setErrMsg("Missing Username or Password");
      } else if (err?.response == 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Log In failed");
      }
      errRef.current.focus();
      setSuccess(false);
    }
  };

  const handleSignUp = async (e) => {
    navigate("/SignUp");
  };

  return (
    <div className="Login">
      <section>
        <h1 className="title">Log In</h1>
        <h2 className="title">MOTO MEET</h2>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <form onSubmit={handleLogIn}>
          <label htmlFor="username">Username</label>
          <input
            placeholder="Username"
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          ></input>
          <label htmlFor="password">Password</label>
          <input
            placeholder="Password"
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          ></input>

          <button>Log In</button>
          <button onClick={handleSignUp}>Sign Up</button>
        </form>
      </section>
    </div>
  );
};
export default LoginPage;
