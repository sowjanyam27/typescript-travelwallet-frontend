import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Fab from "@material-ui/core/Fab";

import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/People";
import AddIcon from "@material-ui/icons/Add";

import { fetchAllTrips } from "../../store/Homepage/actions";
import { selectUser } from "../../store/user/selectors";
import { selectTripsOfUser } from "../../store/Homepage/selector";
import { selectToken } from "../../store/user/selectors";
import { staticUrl } from "../../config/constants";
import { fetchTripGroupDetails } from "../../store/Homepage/actions";
import "./HomePage.css";

export default function HomePage() {
  const dispatch = useDispatch();
  const { id } = useSelector(selectUser);
  const { trips, tripGroups } = useSelector(selectTripsOfUser);
  const history = useHistory();
  const token = useSelector(selectToken);
  const [group, setGroup] = useState({});
  console.log("trips : ", trips);

  //Fetch trips of user (id)
  useEffect(() => {
    if (id !== undefined) {
      dispatch(fetchAllTrips(id, token));
    }
  }, [id]);

  if (!token) {
    history.push("/");
  }
  //To identify if the trip is group trip or solo trip
  useEffect(() => {
    let object = tripGroups.reduce(
      (obj, item) => ((obj[item.tripId] = parseInt(item.n_tripId)), obj),
      {}
    );
    setGroup(object);
  }, [tripGroups]);

  useEffect(() => {
    const ids = trips.map((t) => t.tripId);
    if (ids.length !== 0) {
      dispatch(fetchTripGroupDetails(ids, token));
    }
  }, [trips]);

  //console.log("tripGroups:", tripGroups);
  return (
    <div className="Homepage">
      <div className="mb-5">
        <span style={{ color: "white" }}>Add trip</span>
        <Fab color="secondary" className="ml-5" aria-label="add">
          <AddIcon onClick={() => history.push("/home/addtrip")} />
        </Fab>{" "}
      </div>

      <Container>
        <Row>
          {trips.map((trip, i) => {
            const imageName = trip.trip.image.split("/");
            return (
              <Col xs={3} key={i} className="box">
                <Link to={`/home/${trip.tripId}`}>
                  <div className="card text-dark">
                    <img
                      className="card-img-top"
                      //src={require(`${trip.trip.image}`)}
                      //src={`${staticUrl}/${imageName[1]}`}
                      src={trip.trip.image}
                      alt="Card image"
                    />
                    <div className="card-body">
                      <h5 className="card-text">
                        {trip.trip.title}
                        <span style={{ marginLeft: "20px" }}>
                          {group[trip.tripId] > 1 ? (
                            <PeopleIcon style={{ color: "purple" }} />
                          ) : (
                            <PersonIcon style={{ color: "purple" }} />
                          )}
                        </span>
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
