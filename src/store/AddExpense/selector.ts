import { ExpenseState } from "./types";

export const selectExpenses = (state: ExpenseState) => state.expenses;
