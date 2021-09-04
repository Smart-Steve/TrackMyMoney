import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput } from "react-native";

import { Text, View } from "../components/Themed";

import * as FileSystem from "expo-file-system";

export default function AddExpenseScreen() {
  const [state, setState] = useState({ name: "test" });

  const saveExpense = async () => {
    console.log("expense saved");
    let fileName = FileSystem.documentDirectory + "expense";
    await FileSystem.writeAsStringAsync(fileName, state.name);
    let result = await FileSystem.readAsStringAsync(fileName);
    Alert.alert("Saved", result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name</Text>
      <TextInput style={styles.input} value={state.name} onChangeText={(x) => setState({ ...state, name: x })} />
      <Button title="Add expense" onPress={saveExpense} />
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
