import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import ExpensesService from "../services/ExpensesService";
import { IExpense, IExpenseCategory, IProduct, IProductCategory } from "../models/Models";
import { jSXElement } from "@babel/types";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput, Button, Paragraph, Dialog, Portal, Provider, Card } from "react-native-paper";
import AddProduct from "../components/AddProduct";
import { Observable, Subject } from "rxjs";

export default function AddExpenseScreen() {
  const expensesService = new ExpensesService();
  const defaultState = {
    expenseName: "",
    products: [{ id: 0, name: "Test", quantity: 1, amount: 5 }] as IProduct[],
  };
  const [state, setState] = useState(defaultState);
  const dialogVisiblitySubject = new Subject<boolean>();

  const addProductSubject = new Subject<IProduct>();
  addProductSubject.subscribe((x) => {
    setState({
      ...state,
      products: [...state.products, x],
    });
  });

  const resetState = (): void => {
    setState({
      ...state,
      expenseName: defaultState.expenseName,
      products: defaultState.products,
    });
  };

  const showDialog = () => dialogVisiblitySubject.next(true);

  const setExpensename = (value: string): void => {
    setState({ ...state, expenseName: value });
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
          <TextInput label="Expense name" mode={"flat"} onKeyPress={(ev) => setExpensename(ev.target.toString())} />
          {state.products.map((x) => (
            <Card key={x.id}>
              <Card.Title title={x.name} />
              <Card.Content>
                {x.quantity} * {x.amount}zł
              </Card.Content>
            </Card>
          ))}
          <Button mode="contained" onPress={showDialog}>
            Add another product
          </Button>
          <Button mode="contained" onPress={async () => await addExpense()}>
            Save expense
          </Button>
        </form>
      </ScrollView>
      <AddProduct dialogVisiblitySubject={dialogVisiblitySubject} addProductSubject={addProductSubject} />
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
