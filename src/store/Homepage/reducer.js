const initialState = {
  trips: [],
  users: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "TRIPS_FETCHED":
      return { ...state, trips: payload };
    case "USERS_FETCHED_FOR_TRIP":
      return {
        ...state,
        users: payload,
      };
    default:
      return state;
  }
};
