const initialState = {
  trips: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "TRIPS_FETCHED":
      return { ...state, trips: payload };
    default:
      return state;
  }
};
