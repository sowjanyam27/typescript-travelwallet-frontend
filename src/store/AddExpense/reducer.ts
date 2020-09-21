import {
  InitialExpenseState,
  actionType,
  ALL_EXPENSES,
  ALL_EXPENSE_TYPES,
  ALL_EXPENSES_SUMMARY,
  ALL_USER_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
} from "./types";

const initialState: InitialExpenseState = {
  expenses: [],
  expensesSummary: [],
  expenseTypes: [],
  userExpenses: [],
};

export default (state = initialState, action: actionType) => {
  switch (action.type) {
    case ALL_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
      };
    case ALL_EXPENSE_TYPES:
      return {
        ...state,
        expenseTypes: action.payload,
      };
    case ADD_EXPENSE:
      const updatedExpenses = [...state.expenses];
      const found = updatedExpenses.find(
        (expense) => expense.id === action.payload.id
      );
      if (!found) {
        updatedExpenses.push(action.payload);
      }
      console.log("updatedExpenses:", updatedExpenses);
      return {
        ...state,
        expenses: updatedExpenses,
      };
    case DELETE_EXPENSE:
      const afterDelete = [...state.expenses];
      const after = afterDelete.filter((e) => e.id !== action.payload);
      return {
        ...state,
        expenses: after,
      };
    case ALL_EXPENSES_SUMMARY:
      return {
        ...state,
        expensesSummary: action.payload,
      };
    case ALL_USER_EXPENSES:
      return {
        ...state,
        userExpenses: action.payload,
      };
    default:
      return state;
  }
};
