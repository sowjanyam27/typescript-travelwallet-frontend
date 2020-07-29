import React, { useState, useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import { selectToken, selectUser } from "../../store/user/selectors";
import {
  postNewTrip,
  fetchUser,
  addFriendsToTrip,
} from "../../store/Addtrip/actions";
import MessageBox from "../../components/MessageBox/index";
import "./AddTrip.css";
import { selectNewTrip } from "../../store/Addtrip/selectors";

// Schema for yup
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "*Post title must have at least 3 characters")
    .max(25, "*Post title can't be longer than 25 characters")
    .required("*Title is required"),
  amount: Yup.number()
    .positive("*amount must be positive")
    .required("*amount is required"),
  image: Yup.mixed().required(),
});

export default function AddTrip() {
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

  function addTrip(values) {
    //event.preventDefault();
    console.log(
      "image:",
      values.image,
      "title:",
      values.title,
      "amount:",
      values.amount
    );

    const data = new FormData();
    data.append("title", values.title);
    data.append("amount", values.amount);
    data.append("file", values.image);
    console.log("data:", data);

    dispatch(postNewTrip(data, token));
    //dispatch(postNewTrip(title, amount, image, user.id, token));
  }

  function finalSubmit(event) {
    event.preventDefault();
    dispatch(addFriendsToTrip(trip.id, friends, user.id, token));
    //Once trip is created in the table CLEAR_TRIP is for clearing the old data.
    dispatch({
      type: "CLEAR_TRIP",
    });
    history.push("/home");
  }

  //Once the new friend is added we verify if he is a valid user then
  //adding the new user to the shared friends
  useEffect(() => {
    //If newUser is a not a valid registred user then object is empty
    if (Object.entries(newUser).length !== 0) {
      if (newUser.id === 0) {
        setMessage(`User not found`);
        //Since we assigned id = 0 for user not found case assiging back to {} for newuser
        dispatch({
          type: "CLEAR_NEWUSER",
          payload: {},
        });
      } else {
        const newUsers = [...friends];
        const found = newUsers.find((user) => user.id === newUser.id);
        if (!found) {
          newUsers.push(newUser);
        } else {
          setMessage(`${newUser.fullname} is already added`);
        }
        setFriends(newUsers);
      }
    }
  }, [newUser]);

  console.log("trip:", trip);
  console.log("newUser:", newUser);
  console.log("friends:", friends);
  return (
    <div>
      <h1>Add a New Trip</h1>
      <div className="addtrip">
        <Container>
          <Formik
            initialValues={{
              title: "",
              amount: "",
              image: null,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              // When button submits form and form is in the process of submitting, submit button is disabled
              setSubmitting(true);

              // Simulate submitting to database, shows us values submitted, resets form
              setTimeout(() => {
                //alert(JSON.stringify(values, null, 2));
                addTrip(values);
                resetForm();
                setSubmitting(false);
              }, 500);
            }}
          >
            {/* Callback function containing Formik state and helpers that handle common form actions */}
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              setFieldValue,
              isSubmitting,
            }) => (
              <Form
                md={{ span: 6, offset: 3 }}
                onSubmit={handleSubmit}
                className="mt-5"
              >
                <Form.Group as={Row}>
                  <Form.Label>Title *</Form.Label>
                  <Form.Control
                    value={values.title}
                    onChange={handleChange}
                    name="title"
                    type="text"
                    placeholder="Enter title.."
                    className={touched.title && errors.title && "error"}
                  />
                  {touched.title && errors.title ? (
                    <div className="error-message">{errors.title}</div>
                  ) : null}
                </Form.Group>

                <Form.Group as={Row}>
                  <Form.Label>Estimated Budget *</Form.Label>
                  <Form.Control
                    type="number"
                    value={values.amount}
                    placeholder="0"
                    min="0"
                    name="amount"
                    onChange={handleChange}
                    className={touched.amount && errors.amount && "error"}
                  />
                  {touched.amount && errors.amount ? (
                    <div className="error-message">{errors.amount}</div>
                  ) : null}
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label>Image *</Form.Label>
                  <Form.Control
                    type="file"
                    name="image"
                    id="image"
                    onChange={(event) =>
                      setFieldValue("image", event.target.files[0])
                    }
                    required
                    className={touched.image && errors.image && "error"}
                  />

                  {touched.image && errors.image ? (
                    <div className="error-message">{errors.image}</div>
                  ) : null}
                </Form.Group>

                <Form.Group as={Row} className="mt-5">
                  <Button
                    variant="primary"
                    type="submit"
                    style={{ background: "#6B9DAC", width: "130px" }}
                    disabled={isSubmitting}
                  >
                    Add Trip
                  </Button>
                  <MessageBox />
                </Form.Group>
              </Form>
            )}
          </Formik>
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
                <div className="row">
                  <div className="col">
                    <Form.Control
                      type="text"
                      value={email}
                      style={{ marginLeft: "20px", width: "200px" }}
                      placeholder="email of the user"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <div className="col">
                    <Button
                      onClick={addFriend}
                      style={{ marginLeft: "50px" }}
                      type="button"
                      className="btn btn-primary btn-circle btn-md"
                    >
                      <strong style={{ fontSize: "2em" }}>+</strong>
                    </Button>
                  </div>
                </div>
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
