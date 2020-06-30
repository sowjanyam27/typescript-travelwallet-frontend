import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { fetchAllTrips } from "../../store/Homepage/actions";
import { selectUser } from "../../store/user/selectors";
import { selectTripsOfUser } from "../../store/Homepage/selector";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./HomePage.css";
import Button from "react-bootstrap/Button";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

export default function HomePage() {
  const dispatch = useDispatch();
  const { id } = useSelector(selectUser);
  const { trips } = useSelector(selectTripsOfUser);
  console.log("trips : ", trips);
  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchAllTrips(id));
    }
  }, [id]);

  return (
    <div className="Homepage">
      <div className="add">
        Add trip
        <button type="button" class="btn btn-primary btn-circle btn-md">
          <strong style={{ fontSize: "2em" }}>+</strong>
        </button>
      </div>

      <Container>
        <Row>
          {trips.map((trip, i) => {
            return (
              <Col xs={6} key={i} className="box">
                <Link to={`/home/${trip.tripId}`}>
                  <img
                    src={trip.trip.image}
                    alt="pic"
                    className="img-responsive fit-image"
                  />
                  <p className="text">{trip.trip.title}</p>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
