import axios from "axios";
import { apiUrl } from "../../config/constants";
import { showMessageWithTimeout } from "../appState/actions";

export function allTrips(data) {
  return {
    type: "TRIPS_FETCHED",
    payload: data,
  };
}

//API request for fetching artworks from the server
export function fetchAllTrips(id) {
  return async function thunk(dispatch, getState) {
    console.log("id in action:", id);
    const output = await axios.get(`${apiUrl}/home/${id}`);
    console.log("output:", output);
    dispatch(allTrips(output.data));
  };
}
