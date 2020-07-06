import React, { useState, useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";

import { selectToken, selectUser } from "../../store/user/selectors";
import {
  postNewTrip,
  fetchUser,
  addFriendsToTrip,
} from "../../store/Addtrip/actions";
import MessageBox from "../../components/MessageBox/index";
import "./AddTrip.css";
import { selectNewTrip } from "../../store/Addtrip/selectors";
import Axios from "axios";

export default function AddTrip() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState("");
  const [friends, setFriends] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Add Friend");
  const token = useSelector(selectToken);

  const user = useSelector(selectUser);
  const { trip, newUser } = useSelector(selectNewTrip);
  const dispatch = useDispatch();
  const history = useHistory();

  const addFriend = () => {
    if (email !== user.email) {
      setMessage("Add Friend");
      dispatch(fetchUser(email, token));
      setEmail("");
    } else {
      setMessage("Cannot add loggedin user as friend");
      setEmail("");
    }
  };

  console.log("image:", image);
  function addTrip(event) {
    event.preventDefault();
    //console.log("title , amount ,image", title, amount, image);
    console.log("Submitted");
    const data = new FormData();
    data.append("title", title);
    data.append("amount", amount);
    data.append("file", image);
    console.log("data:", data);

    dispatch(postNewTrip(data, token));
    //dispatch(postNewTrip(title, amount, image, user.id, token));
  }

  function finalSubmit(event) {
    event.preventDefault();
    //console.log("Submitted");
    dispatch(addFriendsToTrip(trip.id, friends, user.id, token));
    dispatch({
      type: "CLEAR_TRIP",
    });
    history.push("/home");
  }

  useEffect(() => {
    if (Object.entries(newUser).length !== 0) {
      const newUsers = [...friends];
      const found = newUsers.find((user) => user.id === newUser.id);
      if (!found) {
        newUsers.push(newUser);
      } else {
        setMessage(`${newUser.fullname} is already added`);
      }
      setFriends(newUsers);
    }
  }, [newUser]);

  console.log("trip:", trip);
  console.log("newUser:", newUser);
  console.log("friends:", friends);
  return (
    <div>
      <Jumbotron style={{ background: "#EED9E7" }}>
        <h1>Add a New Trip</h1>
      </Jumbotron>
      <div className="addtrip">
        <Container>
          <Form md={{ span: 6, offset: 3 }} className="mt-5">
            <Form.Group as={Row}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="title of your trip"
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label>Estimated Budget</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                placeholder="0"
                min="0"
                onChange={(event) => setAmount(event.target.value)}
              />
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type="file"
                onChange={(event) => setImage(event.target.files[0])}
              />
            </Form.Group>

            <Form.Group as={Row} className="mt-5">
              <Button
                variant="primary"
                type="submit"
                onClick={addTrip}
                style={{ background: "#6B9DAC", width: "130px" }}
              >
                Add Trip
              </Button>
              <MessageBox />
            </Form.Group>
          </Form>
          {friends.length > 0
            ? friends.map((f, i) => (
                <p key={i} style={{ color: "green" }}>
                  <em>{f.fullname} is Added to the trip</em>
                </p>
              ))
            : null}
          {Object.entries(trip).length !== 0 ? (
            <Form>
              <Form.Group as={Row}>
                <Form.Label>
                  <em>{message}</em>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={email}
                  placeholder="email of the user"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Button
                  variant="primary"
                  type="button"
                  onClick={addFriend}
                  style={{ background: "#6B9DAC", width: "130px" }}
                >
                  Add Friend
                </Button>
              </Form.Group>
            </Form>
          ) : null}
          <Form>
            <Form.Group as={Row} className="mt-5">
              <Button
                variant="primary"
                type="submit"
                onClick={finalSubmit}
                style={{ background: "green", width: "130px" }}
              >
                submit
              </Button>
              <MessageBox />
            </Form.Group>
          </Form>
        </Container>
      </div>
    </div>
  );
}
