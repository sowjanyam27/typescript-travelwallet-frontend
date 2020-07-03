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
export function postNewTrip(title, budget, image, userId, token) {
  return async function thunk(dispatch, getState) {
    const output = await axios.post(
      `${apiUrl}/trip`,
      {
        title,
        budget,
        image,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("output in action:", output.data);
    dispatch(addTrip(output.data));
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
