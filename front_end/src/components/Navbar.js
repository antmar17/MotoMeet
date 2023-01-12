import React, { Component, useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import "../assets/css/Navbar.css";
import AuthContext from "../context/AuthProvider";
import { UserContext } from "../context/UserContext";
const Navbar = () => {
  const { auth, setAuth } = useContext(UserContext);
  const [user, setUser] = useState(localStorage.getItem("username"));

  useEffect(() => {
    console.log(user);
  }, []);
  const MenuItems = [
    {
      title: "Home",
      url: "/Landing",
      cName: "nav-links",
    },
    {
      title: "My Events",
      url: "/MyEvents",
      cName: "nav-links",
    },
    {
      title: "Create Event",
      url: "/Create",
      cName: "nav-links",
    },
    {
      title: "Contact Us",
      url: "#",
      cName: "nav-links",
    },
    {
      title: "View Profile",
      url: "/Profile/" + user,
      cName: "nav-links",
    },
  ];

  let navigate = useNavigate();
  const [state, setState] = useState({ clicked: false });
  const handleClick = () => {
    setState({ clicked: !state.clicked });
  };

  function handleLogOut() {
    console.log(auth);
    navigate("/");
  }
  return (
    <nav className="NavBarItems">
      <h className="navbar-logo">MotoMeet</h>
      <div
        className="menu-icon"
        onClick={() => {
          handleClick();
        }}
      >
        <i className={state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={state.clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li>
              <a className={item.cName} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
      <Button onClick={handleLogOut}>Logout</Button>
    </nav>
  );
};

export default Navbar;

//class Navbar extends Component {
//  MenuItems = [
//    {
//      title: "Home",
//      url: "/Landing",
//      cName: "nav-links",
//    },
//    {
//      title: "My Events",
//      url: "/MyEvents",
//      cName: "nav-links",
//    },
//    {
//      title: "Create Event",
//      url: "/Create",
//      cName: "nav-links",
//    },
//    {
//      title: "Contact Us",
//      url: "#",
//      cName: "nav-links",
//    },
//    {
//      title: "View Profile",
//      url: "/Profile/",
//      cName: "nav-links",
//    },
//  ];
//
//  state = { clicked: false };
//  handleClick = () => {
//    this.setState({ clicked: !this.state.clicked });
//  };
//
//  handleLogOut = () => {
//    let navigate = useNavigate();
//    navigate("/Profile");
//  };
//  render() {
//    return (
//      <nav className="NavBarItems">
//        <h className="navbar-logo">MotoMeet</h>
//        <div className="menu-icon" onClick={this.handleClick}>
//          <i
//            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
//          ></i>
//        </div>
//        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
//          {this.MenuItems.map((item, index) => {
//            return (
//              <li>
//                <a className={item.cName} href={item.url}>
//                  {item.title}
//                </a>
//              </li>
//            );
//          })}
//        </ul>
//        <Button onClick={this.handleLogOut}>Logout</Button>
//      </nav>
//    );
//  }
//}
//
//export default Navbar;
//
