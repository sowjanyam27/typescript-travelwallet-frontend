import axios from "axios";
import { apiUrl } from "../../config/constants";

export function addTrip(data) {
  return {
    type: "ADD_TRIP",
    payload: data,
  };
}

export function addUser(data) {
  return {
    type: "ADD_USER",
    payload: data,
  };
}

//API request for posting new trip
export function postNewTrip(data, token) {
  console.log("data in action:", data);
  return async function thunk(dispatch, getState) {
    axios
      .post(`${apiUrl}/trip`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => dispatch(addTrip(res.data)))
      .catch((err) => console.log(err));
  };
}

//API request for fetching user from the user table
export function fetchUser(email, token) {
  return async function thunk(dispatch, getState) {
    const output = await axios.get(`${apiUrl}/user/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (output.data !== "") {
      dispatch(addUser(output.data));
    } else {
      dispatch({
        type: "USER_NOT_FOUND",
        payload: { id: 0 }, //Since the reponse from api is null just assigning id with 0
        //To identify in the front end that user is not found
      });
    }
  };
}

//API request for posting friends to the trip
export function addFriendsToTrip(tripId, friends, userId, token) {
  return async function thunk(dispatch, getState) {
    const output = await axios.post(
      `${apiUrl}/home/${userId}`,
      {
        tripId,
        friends,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("output:", output);
  };
}
