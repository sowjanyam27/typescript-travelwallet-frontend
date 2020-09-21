import { Trip } from "../../types/tripdetails";
import { UserType } from "../../types/user";

export const ADD_TRIP = "ADD_TRIP";
export const ADD_USER = "ADD_USER";
export const USER_NOT_FOUND = "USER_NOT_FOUND";
export const CLEAR_TRIP = "CLEAR_TRIP";
export const CLEAR_NEWUSER = "CLEAR_NEWUSER";

export type InitialAddTripState = {
  trip: Trip;
  newUser: UserType;
};

export type AddTripState = {
  trip: InitialAddTripState;
};

export type GetAddTripState = () => AddTripState;

type AddTripType = {
  type: typeof ADD_TRIP;
  payload: Trip;
};

type AddUserType = {
  type: typeof ADD_USER;
  payload: UserType;
};

type ClearTripType = {
  type: typeof CLEAR_TRIP;
};

type UserNotFoundType = {
  type: typeof USER_NOT_FOUND;
};

type ClearNewUserType = {
  type: typeof CLEAR_NEWUSER;
};

export type actionType =
  | AddTripType
  | AddUserType
  | ClearTripType
  | UserNotFoundType
  | ClearNewUserType;
