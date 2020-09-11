import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import currency from "currency.js";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";

import { selectToken } from "../../store/user/selectors";
import MessageBox from "../../components/MessageBox/index";
import { selectUsersofTrips } from "../../store/Homepage/selector";
import { postNewExpense } from "../../store/AddExpense/actions";
import { Friend, ValueTypes } from "../../types/tripdetails";

// Schema for yup
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "*Post title must have at least 3 characters")
    .max(25, "*Post title can't be longer than 25 characters")
    .required("*Title is required"),
  amount: Yup.number()
    .positive("*amount must be positive")
    .required("*amount is required"),
  expenseType: Yup.number().required("*expenseType is required").integer(),
  spentBy: Yup.number().integer(),
  sharedBy: Yup.array(),
});

type mdType = {
  span: number;
  offset: number;
};

export default function AddExpense() {
  const friends: Friend[] = useSelector(selectUsersofTrips);
  const token = useSelector(selectToken);
  //console.log("friends:", friends);
  const dispatch = useDispatch();
  const history = useHistory();
  const initValues: ValueTypes = {
    title: "",
    amount: 0,
    expenseType: 5,
    spentBy: "",
    sharedBy: [],
  };
  function submitForm(values: ValueTypes) {
    // event.preventDefault();
    console.log(
      "Details",
      values.title,
      values.amount,
      values.expenseType,
      values.sharedBy,
      "spentBy:",
      values.spentBy
    );
    dispatch(
      postNewExpense(
        values.title,
        currency(values.amount),
        values.expenseType,
        values.sharedBy,
        values.spentBy ? parseInt(values.spentBy) : friends[0].userId,
        friends[0].tripId,
        token
      )
    );
    history.push(`/home/${friends[0].tripId}`);
  }
  //console.log("friends:", friends);
  return (
    <div>
      <h1 className="mt-4">Add a New Expense</h1>
      <Container>
        <Formik
          initialValues={initValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            setTimeout(() => {
              submitForm(values);
              resetForm();
              setSubmitting(false);
            }, 500);
          }}
        >
          {/* Callback function containing Formik state and helpers that handle common form actions */}
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form
              /* md={{ span: 6, offset : 3 }} */
              onSubmit={handleSubmit}
              className="mt-5"
            >
              <Form.Group>
                <Form.Label> Expense Title *</Form.Label>
                <Form.Control
                  style={{ width: "50%" }}
                  value={values.title}
                  onChange={handleChange}
                  name="title"
                  type="text"
                  placeholder="Enter title.."
                />
                {touched.title && errors.title ? (
                  <div className="error-message">{errors.title}</div>
                ) : null}
              </Form.Group>

              <Form.Group>
                <Form.Label>Amount *</Form.Label>
                <Form.Control
                  style={{ width: "50%" }}
                  type="number"
                  value={values.amount}
                  placeholder="0"
                  min="0"
                  name="amount"
                  onChange={handleChange}
                />
                {touched.amount && errors.amount ? (
                  <div className="error-message">{errors.amount}</div>
                ) : null}
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Expense Type</Form.Label>
                <Form.Control
                  as="select"
                  style={{ width: "50%" }}
                  name="expenseType"
                  value={values.expenseType}
                  onChange={handleChange}
                >
                  <option label="select" />
                  <option value="1" label="Food" />
                  <option value="2" label="Transport" />
                  <option value="3" label="accommodation" />
                  <option value="4" label="shopping" />
                  <option value="5" label="Other" />
                </Form.Control>
                {errors.expenseType && touched.expenseType && (
                  <div className="input-feedback">{errors.expenseType}</div>
                )}
              </Form.Group>
              {friends.length > 1 ? (
                <div>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Spent By</Form.Label>
                    <Form.Control
                      as="select"
                      name="spentBy"
                      value={values.spentBy}
                      onChange={handleChange}
                    >
                      <option value="" label="Paid by" />
                      {friends.map((f, i: number) => (
                        <option
                          key={i}
                          value={f.user.id}
                          label={f.user.fullname}
                        />
                      ))}
                    </Form.Control>
                    {errors.spentBy && touched.spentBy && (
                      <div className="input-feedback">{errors.spentBy}</div>
                    )}
                  </Form.Group>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Label>Shared by</Form.Label>
                    <FieldArray
                      name="sharedBy"
                      render={(arrayHelpers) => (
                        <div>
                          {friends.map((f, i: number) => (
                            <div key={i}>
                              <label>
                                <input
                                  type="checkbox"
                                  name="sharedBy"
                                  value={f.user.id}
                                  checked={values.sharedBy.includes(f.user.id)}
                                  onChange={(e) => {
                                    if (e.target.checked)
                                      arrayHelpers.push(f.user.id);
                                    else {
                                      const idx = values.sharedBy.indexOf(
                                        f.user.id
                                      );
                                      arrayHelpers.remove(idx);
                                    }
                                  }}
                                />{" "}
                                {f.user.fullname}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                  </Form.Group>
                </div>
              ) : null}

              <Form.Group className="mt-5">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ background: "#6B9DAC", width: "130px" }}
                >
                  Add Expense
                </Button>
                <MessageBox />
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}
