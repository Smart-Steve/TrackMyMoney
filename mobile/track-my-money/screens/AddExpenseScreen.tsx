import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Form, Input, SubmitButton, ResetButton } from "formik-semantic-ui-react";

import { Text, View } from "../components/Themed";
import { Formik } from "formik";
import { Label, LabelDetail } from "semantic-ui-react";
import ExpensesService from "../services/ExpensesService";
import { IExpense, IProduct } from "../models/Models";

export default function AddExpenseScreen() {
  const expensesService = new ExpensesService();
  const [state, setState] = useState({ isLoading: false });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ name: "", quantity: 1, amount: 0 }}
        onSubmit={async (x) => {
          setState({ ...state, isLoading: true });
          const product: IProduct = {
            name: x.name,
            price: parseFloat((x.amount / x.quantity).toFixed(2)),
          };
          const expense: IExpense = {
            product: product,
            quantity: x.quantity,
            amount: x.amount,
          };
          await expensesService.AddExpense(expense);
          setState({ ...state, isLoading: false });
        }}
      >
        <Form size="large">
          <LabelDetail>Name</LabelDetail>
          <Input type="text" name="name" placeholder="Name of bought product" errorPrompt />
          <LabelDetail>Quantity</LabelDetail>
          <Input type="number" name="quantity" errorPrompt />
          <LabelDetail>Amount</LabelDetail>
          <Input type="number" name="amount" errorPrompt />
          <SubmitButton fluid primary loading={state.isLoading}>
            Add expense
          </SubmitButton>
          <ResetButton fluid secondary>
            Reset
          </ResetButton>
        </Form>
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  input: {
    height: 40,
    minWidth: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
