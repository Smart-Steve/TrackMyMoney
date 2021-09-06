import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import ExpensesService from "../services/ExpensesService";
import { IExpense, IExpenseCategory, IProduct, IProductCategory } from "../models/Models";
import { jSXElement } from "@babel/types";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";

export default function AddExpenseScreen() {
  const expensesService = new ExpensesService();
  const defaultState = {
    lastProductId: 0,
    expenseName: "",
    products: [{ id: 0, name: "", quantity: 1, amount: 0 }],
  };
  const [state, setState] = useState(defaultState);

  const resetState = (): void => {
    setState({
      ...state,
      lastProductId: defaultState.lastProductId,
      expenseName: defaultState.expenseName,
      products: defaultState.products,
    });
  };

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

  const addExpense = async (): Promise<void> => {
    const products: IProduct[] = state.products.map((x) => {
      const category: IProductCategory = {
        id: 1,
        name: "testProductCategory",
      };
      const product: IProduct = {
        id: Math.random(),
        name: x.name,
        amount: x.amount,
        quantity: x.quantity,
        category: category,
      };
      return product;
    });

    const category: IExpenseCategory = {
      id: 1,
      name: "testExpenseCategory",
    };
    const expense: IExpense = {
      id: Math.random(),
      name: state.expenseName,
      amount: products.map((x) => x.amount).reduce((a, b) => a + b),
      products: products,
      category: category,
    };

    await expensesService.AddExpense(expense);
    Alert.alert(`Expense ${expense.name} has been saved`);

    resetState();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <form>
          <label>Expense name</label>
          <input type="text" name="name" onChange={(ev) => setExpensename(ev.target.value)} />
          {state.products.map((x) => (
            <div>
              <label>Product name</label>
              <input type="text" onChange={(ev) => setProductName(x.id, ev.target.value)} />
              <label>Quantity</label>
              <input type="number" onChange={(ev) => setProductQuantity(x.id, parseInt(ev.target.value))} />
              <label>Amount</label>
              <input type="number" onChange={(ev) => setProductAmount(x.id, parseInt(ev.target.value))} />
            </div>
          ))}
          <button color="blue" type="button" onClick={addProductInput}>
            Add another product
          </button>
          <button color="green" type="button" onClick={async () => await addExpense()}>
            Add expense
          </button>
        </form>
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
