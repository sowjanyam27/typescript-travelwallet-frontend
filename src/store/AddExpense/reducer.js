const initialState = {
  expenses: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "ALL_EXPENSES":
      return {
        ...state,
        expenses: payload,
      };
    case "ADD_EXPENSE":
      const updatedExpenses = [...state.expenses];
      updatedExpenses.push(payload);
      console.log("updatedExpenses:", updatedExpenses);
      return {
        ...state,
        expenses: updatedExpenses,
      };
    default:
      return state;
  }
};
