import {
  TypesExpenses,
  ExpenseSummaryTypes,
  ExpenseTypes,
  UserExpensesTypes,
} from "../../types/expense";

export const ALL_EXPENSES = "ALL_EXPENSES";
export const ALL_EXPENSE_TYPES = "ALL_EXPENSE_TYPES";
export const ADD_EXPENSE = "ADD_EXPENSE";
export const DELETE_EXPENSE = "DELETE_EXPENSE";
export const ALL_EXPENSES_SUMMARY = "ALL_EXPENSES_SUMMARY";
export const ALL_USER_EXPENSES = "ALL_USER_EXPENSES";

export type ExpenseState = {
  expenses: InitialExpenseState;
};

export type GetExpenseState = () => ExpenseState;

export type InitialExpenseState = {
  expenses: TypesExpenses[];
  expensesSummary: ExpenseSummaryTypes[];
  expenseTypes: ExpenseTypes[];
  userExpenses: UserExpensesTypes[];
};

type AllExpenses = {
  type: typeof ALL_EXPENSES;
  payload: TypesExpenses[];
};
type AllExpensesSummaryType = {
  type: typeof ALL_EXPENSES_SUMMARY;
  payload: ExpenseSummaryTypes[];
};
type FetchExpensesTypes = {
  type: typeof ALL_EXPENSE_TYPES;
  payload: ExpenseTypes[];
};
type UserExpensesType = {
  type: typeof ALL_USER_EXPENSES;
  payload: UserExpensesTypes[];
};
type AddExpenseType = {
  type: typeof ADD_EXPENSE;
  payload: TypesExpenses;
};
type DeleteExpenseType = {
  type: typeof DELETE_EXPENSE;
  payload: number;
};

export type actionType =
  | AllExpenses
  | AllExpensesSummaryType
  | FetchExpensesTypes
  | UserExpensesType
  | AddExpenseType
  | DeleteExpenseType;
