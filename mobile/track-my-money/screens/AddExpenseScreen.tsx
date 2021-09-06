import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import { Card, CardContent, CardDescription, CardHeader, Label, Form, Button } from "semantic-ui-react";
import ExpensesService from "../services/ExpensesService";
import { IExpense, IProduct } from "../models/Models";
import { jSXElement } from "@babel/types";
import { ScrollView } from "react-native-gesture-handler";

export default function AddExpenseScreen() {
  const expensesService = new ExpensesService();
  const [state, setState] = useState({
    isLoading: false,
    lastProductId: 0,
    expenseName: "",
    products: [{ id: 0, name: "", quantity: 1, amount: 0 }],
  });

  const addProductInput = (): void => {
    setState({
      ...state,
      lastProductId: state.lastProductId + 1,
      products: [...state.products, { id: state.lastProductId + 1, name: "", quantity: 1, amount: 0 }],
    });
  };

  const removeProductInput = (id: number): void => {
    setState({ ...state, products: state.products.filter((x) => x.id != id) });
  };

  const setExpensename = (value: string): void => {
    setState({ ...state, expenseName: value });
  };

  const setProductName = (id: number, value: string): void => {
    const products = state.products;
    let product = products.filter((x) => x.id === id)[0];
    product.name = value;
    setState({
      ...state,
      products,
    });
  };

  const setProductQuantity = (id: number, value: number): void => {
    const products = state.products;
    let product = products.filter((x) => x.id === id)[0];
    product.quantity = value;
    setState({
      ...state,
      products,
    });
  };
  const setProductAmount = (id: number, value: number): void => {
    const products = state.products;
    let product = products.filter((x) => x.id === id)[0];
    product.amount = value;
    setState({
      ...state,
      products,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Form>
          <Form.Field>
            <label>Expense name</label>
            <input type="text" name="name" onChange={(ev) => setExpensename(ev.target.value)} />
          </Form.Field>
          <Card.Group style={{ flexDirection: "column", alignItems: "center", margin: "10px" }}>
            {state.products.map((x) => (
              <Card key={x.id}>
                <CardHeader>
                  <Form.Field>
                    <label>Product name</label>
                    <input type="text" onChange={(ev) => setProductName(x.id, ev.target.value)} />
                  </Form.Field>
                </CardHeader>
                <CardContent>
                  <Form.Field>
                    <label>Quantity</label>
                    <input type="number" onChange={(ev) => setProductQuantity(x.id, parseInt(ev.target.value))} />
                  </Form.Field>
                  <Form.Field>
                    <label>Amount</label>
                    <input type="number" onChange={(ev) => setProductAmount(x.id, parseInt(ev.target.value))} />
                  </Form.Field>
                  <Button type="button" color="red" onClick={() => removeProductInput(x.id)}>
                    Remove this product
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Card.Group>
          <Button color="blue" type="button" onClick={addProductInput}>
            Add another product
          </Button>
          <Button
            color="green"
            type="button"
            onClick={() => {
              console.log(state.products);
            }}
          >
            Add expense
          </Button>
          <Button color="grey" type="reset">
            Reset
          </Button>
        </Form>
      </ScrollView>
    </SafeAreaView>
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
