import axios from "axios";
import { apiUrl } from "../../config/constants";

export function addExpense(data) {
  return {
    type: "ADD_EXPENSE",
    payload: data,
  };
}

export function allExpenses(data) {
  return {
    type: "ALL_EXPENSES",
    payload: data,
  };
}

//API request for fetching artworks from the server
export function fetchAllExpensesofTrip(id, token) {
  return async function thunk(dispatch, getState) {
    const output = await axios.get(`${apiUrl}/trip/expenses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    //console.log("output:", output);
    dispatch(allExpenses(output.data));
  };
}

//API request for fetching artworks from the server
export function postNewExpense(
  title,
  amount,
  expensetypeId,
  sharedBy,
  spentBy,
  tripId,
  token
) {
  return async function thunk(dispatch, getState) {
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
