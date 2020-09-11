import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  fetchPhotos,
  openUploadWidget,
} from "../../components/CloudinaryService/CloudinaryService";
import { CloudinaryContext, Image } from "cloudinary-react";

import { selectToken, selectUser } from "../../store/user/selectors";
import {
  postNewTrip,
  fetchUser,
  addFriendsToTrip,
} from "../../store/Addtrip/actions";
import MessageBox from "../../components/MessageBox/index";
import "./AddTrip.css";
import { selectNewTrip } from "../../store/Addtrip/selectors";
import { TripValueTypes, FriendTypes } from "../../types/tripdetails";

// Schema for yup
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "*Post title must have at least 3 characters")
    .max(25, "*Post title can't be longer than 25 characters")
    .required("*Title is required"),
  amount: Yup.number()
    .positive("*amount must be positive")
    .required("*amount is required"),
  //imageUrl: Yup.mixed().required(),
});

export default function AddTrip() {
  const [friends, setFriends] = useState<FriendTypes[]>([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Add Friend");
  const [imageUrl, setImageUrl] = useState("");
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

  function addTrip(values: TripValueTypes) {
    //event.preventDefault();
    console.log(
      "image:",
      imageUrl,
      "title:",
      values.title,
      "amount:",
      values.amount
    );

    dispatch(postNewTrip(values.title, values.amount, imageUrl, token));
    //dispatch(postNewTrip(title, amount, image, user.id, token));
  }
  const beginUpload = (tag: string) => {
    const uploadOptions = {
      cloudName: "geekscloud",
      tags: [tag],
      uploadPreset: "upload",
    };

    openUploadWidget(uploadOptions, (error: any, photos: any) => {
      if (!error) {
        console.log(photos);
        if (photos.event === "success") {
          console.log("photo:", photos.info.url);
          setImageUrl(photos.info.url);
        }
      } else {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    fetchPhotos("image", setImageUrl);
  }, []);
  function finalSubmit(event: any) {
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
  /*   console.log("image:", imageUrl);

  console.log("trip:", trip);
  console.log("newUser:", newUser);
  console.log("friends:", friends); */
  return (
    <div>
      <h1>Add a New Trip</h1>
      <div className="addtrip">
        <Container>
          <Formik
            initialValues={{
              title: "",
              amount: 0,
            }}
            validationSchema={validationSchema}
            onSubmit={(
              values: TripValueTypes,
              { setSubmitting, resetForm }
            ) => {
              console.log("Inside obSumbit", values);
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
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit} className="mt-5">
                <Form.Group as={Row}>
                  <Form.Label>Title *</Form.Label>
                  <Form.Control
                    value={values.title}
                    onChange={handleChange}
                    name="title"
                    type="text"
                    placeholder="Enter title.."
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
                  />
                  {touched.amount && errors.amount ? (
                    <div className="error-message">{errors.amount}</div>
                  ) : null}
                </Form.Group>
                <Form.Group as={Row}>
                  <Row>
                    <Col>
                      <Button
                        variant="secondary"
                        onClick={() => beginUpload("image")}
                      >
                        Upload Image
                      </Button>
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          className="img-responsive"
                          style={{
                            maxHeight: "25vh",
                            maxWidth: "35vw",
                            padding: "10px 0",
                          }}
                        />
                      )}
                    </Col>
                    <Col>
                      <Button
                        variant="primary"
                        type="submit"
                        style={{ background: "#6B9DAC", width: "130px" }}
                        disabled={isSubmitting}
                      >
                        Add Trip
                      </Button>
                      <MessageBox />
                    </Col>
                  </Row>
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
