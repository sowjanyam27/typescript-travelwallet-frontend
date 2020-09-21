import axios from "axios";
import { apiUrl } from "../../config/constants";
import { Dispatch } from "redux";
import {
  actionType,
  GetAddTripState,
  ADD_TRIP,
  ADD_USER,
  USER_NOT_FOUND,
  CLEAR_NEWUSER,
  CLEAR_TRIP,
} from "./types";
import { Trip, FriendTypes } from "../../types/tripdetails";
import { UserType } from "../../types/user";

export function addTrip(trip: Trip): actionType {
  return {
    type: ADD_TRIP,
    payload: trip,
  };
}

export function addUser(newUser: UserType): actionType {
  return {
    type: ADD_USER,
    payload: newUser,
  };
}

//API request for posting new trip
export function postNewTrip(
  title: string,
  amount: number,
  image: string,
  token: string
) {
  return async function thunk(dispatch: Dispatch, getState: GetAddTripState) {
    axios
      .post(
        `${apiUrl}/trip`,
        { title, amount, image },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => dispatch(addTrip(res.data)))
      .catch((err) => console.log(err));
  };
}

//API request for fetching user from the user table
export function fetchUser(email: string, token: string) {
  return async function thunk(dispatch: Dispatch, getState: GetAddTripState) {
    const output = await axios.get(`${apiUrl}/user/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (output.data !== "") {
      dispatch(addUser(output.data));
    } else {
      dispatch({
        type: USER_NOT_FOUND,
      });
    }
  };
}

//API request for posting friends to the trip
export function addFriendsToTrip(
  tripId: number,
  friends: FriendTypes[],
  userId: number,
  token: string
) {
  return async function thunk(dispatch: Dispatch, getState: GetAddTripState) {
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
