import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import "./styles.css";
import logo from "../../images/circle-cropped.png";

export default function Navigation() {
  const token = useSelector(selectToken);

  const homepageControl = token ? (
    <NavbarItem path="/home" linkText="Home" />
  ) : null;
  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar style={{ background: "#151313" }} expand="lg" variant="dark">
      <Navbar.Brand as={NavLink} to="/">
        <img
          style={{
            boxShadow: "none",
            height: "50px",
            width: "50px",
            marginLeft: "10px",
          }}
          src={logo}
          alt="logo"
          className="img-responsive"
        />
        {` Travel Wallet `}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          {homepageControl}
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
