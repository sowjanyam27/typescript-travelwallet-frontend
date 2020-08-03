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
    case "DELETE_TRIP":
      const afterDelete = [...state.trips];
      console.log("beforeDelete:", afterDelete);
      const after = afterDelete.filter((e) => e.tripId !== payload);
      console.log("after:", after);

      return {
        ...state,
        trips: after,
      };

    default:
      return state;
  }
};
