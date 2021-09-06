import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Card } from "semantic-ui-react";

import { Text, View } from "../components/Themed";
import ExpensesService from "../services/ExpensesService";
import { RootTabScreenProps } from "../types";

const expensesService = new ExpensesService();
//
//do zrobienia -> odpala sie wiele setInterval
//każde wywołanie SummaryScreen to nowy setInterval
//-> początkowo odpala sie 1 co 3 sekundy, ale później są 2 co 3 sekundy, 3 co 3 itd
//nie obciąża to bardzo, ale to zbędne bezsensowne akcje
//
export default function SummaryScreen({ navigation }: RootTabScreenProps<"Summary">) {
  const [state, setState] = useState({ items: [{ header: "", description: "", meta: "" }] });
  setInterval(async () => {
    const expenses = await expensesService.GetExpenses();
    if (expenses.length == 0 || expenses.length === state.items.filter((x) => x.header.length > 0).length) {
      return;
    }
    const items = expenses.map((x) => {
      return {
        header: x.product.name,
        description: `${x.product.price}$ * ${x.quantity}`,
        meta: `${x.amount}$`,
      };
    });
    setState({ ...state, items });
  }, 3000);

  return (
    <View style={styles.container}>
      <Card.Group style={{ flexDirection: "column", alignItems: "center", margin: "10px" }} items={state.items} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
});
