import React, { useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Row } from "react-bootstrap";
import { useHistory, Link, useParams } from "react-router-dom";
import currency from "currency.js";
import { selectToken } from "../../store/user/selectors";
import MessageBox from "../../components/MessageBox/index";
import "./AddExpense.css";
import { selectNewTrip } from "../../store/Addtrip/selectors";
import { selectUsersofTrips } from "../../store/Homepage/selector";
import { postNewExpense } from "../../store/AddExpense/actions";

export default function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseType, setexpenseType] = useState("");
  const [spentBy, setSpentBy] = useState("");
  const [sharedBy, setSharedBy] = useState([]);

  const friends = useSelector(selectUsersofTrips);
  const token = useSelector(selectToken);
  const { trip, newUser } = useSelector(selectNewTrip);

  const dispatch = useDispatch();
  const history = useHistory();

  const addFriendToShare = (event) => {
    const userId = event.target.value;
    const sharedByFriends = [...sharedBy];
    if (!sharedByFriends.includes(userId)) {
      sharedByFriends.push(parseInt(userId));
      setSharedBy(sharedByFriends);
    } else {
      const filtered = sharedByFriends.filter((f) => f !== userId);
      setSharedBy(filtered);
    }
  };

  function submitForm(event) {
    event.preventDefault();
    console.log(
      "Details",
      title,
      amount,
      expenseType,
      sharedBy,
      "spentBy:",
      spentBy
    );
    dispatch(
      postNewExpense(
        title,
        currency(amount),
        parseInt(expenseType),
        sharedBy,
        spentBy ? parseInt(spentBy) : friends[0].userId,
        friends[0].tripId,
        token
      )
    );
    history.push(`/home/${friends[0].tripId}`);
  }
  console.log("friends:", friends, "sharedBy:", sharedBy);
  return (
    <div>
      <Jumbotron style={{ background: "#EED9E7" }}>
        <h1>Add a New Expense</h1>
      </Jumbotron>
      <div className="addexpense">
        <Container>
          <Form md={{ span: 6, offset: 3 }} className="mt-5">
            <Form.Group as={Row}>
              <Form.Label> Expense Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="title"
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                placeholder="0"
                min="0"
                onChange={(event) => setAmount(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Expense Type</Form.Label>
              <Form.Control
                as="select"
                onChange={(event) => setexpenseType(event.target.value)}
              >
                <option>select</option>
                <option value="1">Food</option>
                <option value="2">Transport</option>
                <option value="3">accommodation</option>
                <option value="4">shopping</option>
                <option value="5">Other</option>
              </Form.Control>
            </Form.Group>
            {friends.length !== 1 ? (
              <div>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Spent By</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(event) => setSpentBy(event.target.value)}
                  >
                    <option>select</option>
                    {friends.map((f, i) => (
                      <option key={i} value={f.user.id}>
                        {f.user.fullname}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Label>Shared by</Form.Label>
                  {friends.map((f, i) => (
                    <Form.Check
                      key={i}
                      type="checkbox"
                      label={f.user.fullname}
                      onChange={addFriendToShare}
                      value={f.user.id}
                    />
                  ))}
                </Form.Group>
              </div>
            ) : null}

            <Form.Group as={Row} className="mt-5">
              <Button
                variant="primary"
                type="submit"
                onClick={submitForm}
                style={{ background: "#6B9DAC", width: "130px" }}
              >
                Add Expense
              </Button>
              <MessageBox />
            </Form.Group>
          </Form>
        </Container>
      </div>
    </div>
  );
}
