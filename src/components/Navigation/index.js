import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import logo from "../../images/plane.jpg";
import "./styles.css";

export default function Navigation() {
  const token = useSelector(selectToken);

  const homepageControl = token ? (
    <NavbarItem path="/home" linkText="Home" />
  ) : null;
  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar className="color-nav" expand="lg">
      <Navbar.Brand style={{ marginLeft: "30px" }} as={NavLink} to="/">
        <img src={logo} style={{ height: "10%", width: "30%" }} alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse style={{ color: "white" }} id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          {homepageControl}
          {/* 
          <NavbarItem path="/other" linkText="Other" /> */}
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
