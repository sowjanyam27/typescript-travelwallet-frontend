import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { fetchAllTrips } from "../../store/Homepage/actions";
import { selectUser } from "../../store/user/selectors";
import { selectTripsOfUser } from "../../store/Homepage/selector";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./HomePage.css";
import { selectToken } from "../../store/user/selectors";
import { staticUrl } from "../../config/constants";

export default function HomePage() {
  const dispatch = useDispatch();
  const { id } = useSelector(selectUser);
  const { trips } = useSelector(selectTripsOfUser);
  const history = useHistory();
  const token = useSelector(selectToken);

  console.log("trips : ", trips);
  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchAllTrips(id, token));
    }
  }, [id]);

  return (
    <div className="Homepage">
      <div className="card">
        <div className="card-body text-center">
          Add trip
          <button
            onClick={() => history.push("/home/addtrip")}
            type="button"
            className="btn btn-primary btn-circle btn-md"
          >
            <strong style={{ fontSize: "2em" }}>+</strong>
          </button>
        </div>
      </div>

      <Container>
        <Row>
          {trips.map((trip, i) => {
            const imageName = trip.trip.image.split("/");
            return (
              <Col xs={5} key={i} className="box">
                <Link to={`/home/${trip.tripId}`}>
                  <div className="card text-dark">
                    <img
                      className="card-img-top"
                      //src={require(`${trip.trip.image}`)}
                      src={`${staticUrl}/${imageName[1]}`}
                      alt="Card image"
                    />
                    <div className="card-body">
                      <h5 className="card-text text-center">
                        {trip.trip.title}
                      </h5>
                    </div>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
