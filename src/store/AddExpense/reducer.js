const initialState = {
  expenses: [],
  expensesSummary: [],
  expenseTypes: [],
  userExpenses: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "ALL_EXPENSES":
      console.log("payload in reducer:", payload);
      return {
        ...state,
        expenses: payload,
      };
    case "ALL_EXPENSE_TYPES":
      return {
        ...state,
        expenseTypes: payload,
      };
    case "ADD_EXPENSE":
      console.log("payload in add expense:", payload);

      const updatedExpenses = [...state.expenses];
      const found = updatedExpenses.find(
        (expense) => expense.id === payload.id
      );
      if (!found) {
        updatedExpenses.push(payload);
      }
      console.log("updatedExpenses:", updatedExpenses);
      return {
        ...state,
        expenses: updatedExpenses,
      };
    case "DELETE_EXPENSE":
      const afterDelete = [...state.expenses];
      const after = afterDelete.filter((e) => e.id !== payload);
      return {
        ...state,
        expenses: after,
      };
    case "ALL_EXPENSES_SUMMARY":
      return {
        ...state,
        expensesSummary: payload,
      };
    case "ALL_USER_EXPENSES":
      return {
        ...state,
        userExpenses: payload,
      };
    default:
      return state;
  }
};
