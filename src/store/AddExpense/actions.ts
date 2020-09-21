import axios from "axios";
import { apiUrl } from "../../config/constants";
import { Dispatch } from "redux";
import {
  InitialExpenseState,
  actionType,
  ALL_EXPENSES,
  ALL_EXPENSE_TYPES,
  ALL_EXPENSES_SUMMARY,
  ALL_USER_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  GetExpenseState,
} from "./types";

import {
  TypesExpenses,
  ExpenseSummaryTypes,
  ExpenseTypes,
  UserExpensesTypes,
} from "../../types/expense";

export function addExpense(data: TypesExpenses): actionType {
  return {
    type: ADD_EXPENSE,
    payload: data,
  };
}

export function allExpenses(data: TypesExpenses[]): actionType {
  return {
    type: "ALL_EXPENSES",
    payload: data,
  };
}

export function allExpensesSummary(data: ExpenseSummaryTypes[]): actionType {
  return {
    type: "ALL_EXPENSES_SUMMARY",
    payload: data,
  };
}

export function allExpenseTypes(data: ExpenseTypes[]): actionType {
  return {
    type: "ALL_EXPENSE_TYPES",
    payload: data,
  };
}

export function allUserExpenses(data: UserExpensesTypes[]): actionType {
  return {
    type: "ALL_USER_EXPENSES",
    payload: data,
  };
}

//API request for fetching all expenses for the trip
export function fetchAllExpensesofTrip(id: string, token: string) {
  return async function thunk(dispatch: Dispatch, getState: GetExpenseState) {
    const output = await axios.get(`${apiUrl}/trip/expenses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("output in fetchAllExpenses:", output.data);
    dispatch(allExpenses(output.data));
  };
}

//API request for posting new expense
export function postNewExpense(
  title: string,
  amount: number,
  expensetypeId: number,
  sharedBy: number[],
  spentBy: number,
  tripId: number,
  token: string
) {
  return async function thunk(dispatch: Dispatch, getState: GetExpenseState) {
    console.log("expensetypeId:", expensetypeId, typeof expensetypeId);
    const output = await axios.post(
      `${apiUrl}/expense/${tripId}`,
      {
        title,
        amount,
        expensetypeId,
        sharedBy,
        spentBy,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("output after posting:", output.data);
    dispatch(addExpense(output.data));
  };
}

// Aggregated expenses summary of each category
export function fetchAllExpensesSummary(id: string, token: string) {
  return async function thunk(dispatch: Dispatch, getState: GetExpenseState) {
    const output = await axios.get(`${apiUrl}/expense/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("output in fetchAllExpensesSummary:", output);
    dispatch(allExpensesSummary(output.data));
  };
}

//API request for fetching all expenseTypes
export function fetchAllExpenseTypes(token: string) {
  return async function thunk(dispatch: Dispatch, getState: GetExpenseState) {
    const output = await axios.get(`${apiUrl}/types`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("expense types:", output);
    dispatch(allExpenseTypes(output.data));
  };
}

//API request for fetching all user expenses from userExpense table
export function fetchAllUserExpenses(id: string, token: string) {
  return async function thunk(dispatch: Dispatch, getState: GetExpenseState) {
    const output = await axios.get(`${apiUrl}/userexpense/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("expense types:", output);
    dispatch(allUserExpenses(output.data));
  };
}

//API request for deleting the expense
export function deleteExpenseDetails(id: number, token: string) {
  return async function thunk(dispatch: Dispatch, getState: GetExpenseState) {
    const output = await axios.delete(`${apiUrl}/expense/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    //console.log("output", output);
    dispatch({
      type: "DELETE_EXPENSE",
      payload: id,
    });
  };
}
