import axios from "axios";
import { apiUrl } from "../../config/constants";

export function allTrips(data) {
  return {
    type: "TRIPS_FETCHED",
    payload: data,
  };
}

export function allUsersforTrip(data) {
  return {
    type: "USERS_FETCHED_FOR_TRIP",
    payload: data,
  };
}

export function allTripGroupDetails(data) {
  return {
    type: "ALL_TRIP_GROUP_DETAILS",
    payload: data,
  };
}

//API request for fetching artworks from the server
export function fetchAllTrips(id, token) {
  return async function thunk(dispatch, getState) {
    const output = await axios.get(`${apiUrl}/home/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    //console.log("output:", output);
    dispatch(allTrips(output.data));
  };
}

//API request for fetching artworks from the server
export function fetchAllUsersforTrip(id, token) {
  return async function thunk(dispatch, getState) {
    const output = await axios.get(`${apiUrl}/trip/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    //console.log("output:", output);
    dispatch(allUsersforTrip(output.data));
  };
}

//API request for fetching artworks from the server
export function fetchTripGroupDetails(ids, token) {
  console.log("ids in aaction", ids);
  return async function thunk(dispatch, getState) {
    const output = await axios.get(
      `${apiUrl}/group/trip`,

      {
        params: {
          ids,
        },
      }
    );
    console.log("output:", output);
    dispatch(allTripGroupDetails(output.data));
  };
}
