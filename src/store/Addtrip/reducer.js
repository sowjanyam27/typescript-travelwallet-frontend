const initialState = {
  trip: {},
  newUser: {},
  expenses: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_TRIP":
      return {
        ...state,
        trip: payload,
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
        newUser: payload,
      };
    case "USER_NOT_FOUND":
      return {
        ...state,
        newUser: payload,
      };
    default:
      return state;
  }
};
