import { InitialAddTripState, actionType } from "./types";

const initialState: InitialAddTripState = {
  trip: {
    id: 0,
    budget: 0,
    image: "",
    title: "",
  },
  newUser: {
    id: 0,
    email: "",
    fullname: "",
  },
};

export default (state = initialState, action: actionType) => {
  switch (action.type) {
    case "ADD_TRIP":
      return {
        ...state,
        trip: action.payload,
      };
    case "CLEAR_TRIP":
      return {
        ...state,
        trip: {},
        newUser: {},
      };
    case "ADD_USER":
      return {
        ...state,
        newUser: action.payload,
      };
    case "USER_NOT_FOUND":
      return {
        ...state,
        newUser: { id: 0 },
        //Since the reponse from api is null just assigning id with 0
        //To identify in the front end that user is not found
      };
    case "CLEAR_NEWUSER":
      return {
        ...state,
        newUser: {},
      };

    default:
      return state;
  }
};
