import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllExpensesofTrip,
  deleteExpenseDetails,
} from "../../store/AddExpense/actions";
import { selectToken, selectUser } from "../../store/user/selectors";
import { selectExpenses } from "../../store/AddExpense/selector";
import Container from "react-bootstrap/Container";
import { FaTrash } from "react-icons/fa";

import "./Tripdetails.css";
import { fetchAllUsersforTrip } from "../../store/Homepage/actions";
// get our fontawesome imports

export default function TripDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { expenses } = useSelector(selectExpenses);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchAllExpensesofTrip(id, token));
    dispatch(fetchAllUsersforTrip(id, token));
  }, [id]);

  const deleteExpense = (id) => {
    console.log("id:", id);
    dispatch(deleteExpenseDetails(id));
  };

  console.log("expenses:", expenses);
  return (
    <div className="expense">
      <Container className="cont">
        <div className="card text-center">
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Expenses
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/trip/statistics/${id}`}>
                  Statistics
                </Link>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <h5 className="card-title">Trip Expenses</h5>
            <div className="mt-5">
              <div className="card" style={{ borderStyle: "none" }}>
                <ul className="list-group list-group-flush">
                  {expenses.map((expense, i) => {
                    return (
                      <div key={i} className="list-item">
                        <li className="list-inline-item">{expense.title}</li>
                        <li className="list-inline-item">{expense.amount}</li>
                        <button
                          className="list-buttons"
                          onClick={() => deleteExpense(expense.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="card-footer">
            Add Expense
            <button
              onClick={() => history.push("/trip/addexpense")}
              style={{ marginRight: "100px" }}
              type="button"
              className="btn btn-primary btn-circle btn-md"
            >
              <strong style={{ fontSize: "2em" }}>+</strong>
            </button>
            <button
              style={{ marginLeft: "70px" }}
              onClick={() => history.push(`/trip/statistics/${id}`)}
              className="btn btn-primary"
            >
              See Statistics
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
