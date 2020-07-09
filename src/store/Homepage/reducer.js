const initialState = {
  trips: [],
  users: [],
  tripGroups: [],
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
    case "ALL_TRIP_GROUP_DETAILS":
      return {
        ...state,
        tripGroups: payload,
      };
    default:
      return state;
  }
};
