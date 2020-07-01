import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllExpensesofTrip } from "../../store/AddExpense/actions";
import { selectToken, selectUser } from "../../store/user/selectors";
import { selectExpenses } from "../../store/AddExpense/selector";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Tripdetails.css";
import Badge from "react-bootstrap/Badge";
import { fetchAllUsersforTrip } from "../../store/Homepage/actions";

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

  console.log("expenses:", expenses);
  return (
    <div className="expense">
      <Container className="cont">
        <h1>Trip Details</h1>
        <div className="mt-5">
          {expenses.map((expense, i) => {
            return (
              <Row className="row-detail" key={i}>
                <Col className="col-detail" sm={{ size: "auto", offset: 1 }}>
                  {expense.title}
                </Col>
                <Col className="col-detail" sm={{ size: "auto", offset: 1 }}>
                  {expense.amount}
                </Col>
              </Row>
            );
          })}
        </div>
        <div className="addExpense">
          Add Expense
          <button
            onClick={() => history.push("/trip/addexpense")}
            type="button"
            className="btn btn-primary btn-circle btn-md"
          >
            <strong style={{ fontSize: "2em" }}>+</strong>
          </button>
        </div>
      </Container>
    </div>
  );
}
