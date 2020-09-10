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
import { Delete } from "@material-ui/icons";

import { fetchAllTrips } from "../../store/Homepage/actions";
import { selectUser } from "../../store/user/selectors";
import {
  selectTripsOfUser,
  selectTripGroups,
} from "../../store/Homepage/selector";
import { selectToken } from "../../store/user/selectors";

import {
  fetchTripGroupDetails,
  deleteTripDetails,
} from "../../store/Homepage/actions";
import "./HomePage.css";
import { Trips, TripGroups, DefaultGroup } from "../../types/tripdetails";

const options = ["Edit", "Delete"];

const ITEM_HEIGHT = 48;

export default function HomePage() {
  const dispatch = useDispatch();
  const { id } = useSelector(selectUser);
  const trips: Trips[] = useSelector(selectTripsOfUser);
  const tripGroups: TripGroups[] = useSelector(selectTripGroups);
  const history = useHistory();
  const token = useSelector(selectToken);
  const [group, setGroup] = useState<DefaultGroup>({});
  console.log("trips : ", trips);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [tripToChange, setTrip] = useState("");

  console.log("tripToChange:", tripToChange);

  const deleteTrip = (id: number) => {
    console.log("Id,", id);
    dispatch(deleteTripDetails(id, token));
  };

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
    /*   let object = tripGroups.reduce(
      (obj, item) => ((obj[item.tripId] = parseInt(item.n_tripId)), obj),
      {}
    );  */

    let object = tripGroups.reduce(
      (obj: { [key: number]: number }, item) => (
        (obj[item.tripId] = item.n_tripId), obj
      ),
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
      <div className="my-5">
        <span>Add trip</span>
        <Fab color="secondary" className="ml-5" aria-label="add">
          <AddIcon onClick={() => history.push("/home/addtrip")} />
        </Fab>{" "}
      </div>

      <Container>
        <Row>
          {trips.map((trip, i) => {
            return (
              <Col xs={3} key={i} className="box">
                <div className="card text-dark">
                  <Link to={`/home/${trip.tripId}`}>
                    <img
                      className="card-img-top"
                      //src={require(`${trip.trip.image}`)}
                      //src={`${staticUrl}/${imageName[1]}`}
                      src={trip.trip.image}
                      alt="Card image"
                    />
                  </Link>

                  <div className="card-body">
                    <h5 className="card-text">{trip.trip.title}</h5>
                    <Row>
                      <Col>
                        {group[trip.tripId] > 1 ? (
                          <PeopleIcon style={{ color: "purple" }} />
                        ) : (
                          <PersonIcon style={{ color: "purple" }} />
                        )}
                      </Col>
                      <Col>
                        <Delete
                          className="delete-btn"
                          onClick={() => deleteTrip(trip.tripId)}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
