const initialState = {
  expenses: [],
  expensesSummary: [],
  expenseTypes: [],
  userExpenses: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "ALL_EXPENSES":
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
      const updatedExpenses = [...state.expenses];
      updatedExpenses.push(payload);
      console.log("updatedExpenses:", updatedExpenses);
      return {
        ...state,
        expenses: updatedExpenses,
      };
    case "DELETE_EXPENSE":
      console.log("expenses in reducer:", state.expenses, payload);
      const newExpenses = [...state.expenses];
      const afterExpenses = newExpenses.filter((e) => e.id !== payload);
      console.log("expenafterDeleteExpensesses in reducer:", afterExpenses);

    case "ALL_EXPENSES_SUMMARY":
      return {
        ...state,
        expenses: afterExpenses,
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
