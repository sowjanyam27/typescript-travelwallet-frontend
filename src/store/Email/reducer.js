const initialState = {};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case "NEW_EMAIL": {
      return action.payload;
    }
    default:
      return state;
  }
};
