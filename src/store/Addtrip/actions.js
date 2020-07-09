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

//API request for fetching artworks from the server
export function postNewTrip(data, token) {
  console.log("data in action:", data);
  return async function thunk(dispatch, getState) {
    // console.log("path ", `${apiUrl}/trip`);
    axios
      .post(`${apiUrl}/trip`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => dispatch(addTrip(res.data)))
      .catch((err) => console.log(err));

    /*   console.log("output in action:", output);
    dispatch(addTrip(output.data)); */
  };
}

//API request for fetching artworks from the server
export function fetchUser(email, token) {
  return async function thunk(dispatch, getState) {
    const output = await axios.get(`${apiUrl}/user/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log("output:", output);
    if (output.data !== "") {
      dispatch(addUser(output.data));
    } else {
      dispatch({
        type: "USER_NOT_FOUND",
        payload: {},
      });
    }
  };
}

//API request for fetching artworks from the server
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
