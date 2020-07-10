import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router-dom";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(logOut());
    history.push("/");
  };
  return (
    <>
      <Nav.Item style={{ padding: ".5rem 1rem", color: "white" }}>
        {user.email}
      </Nav.Item>
      <Button style={{ background: "black" }} onClick={logoutHandler}>
        Logout
      </Button>
    </>
  );
}
