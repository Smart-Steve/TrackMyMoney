import * as React from "react";
import { Button, Dialog, Checkbox, Paragraph, DefaultTheme, Text, Portal } from "react-native-paper";
import { Alert, SafeAreaView, StyleSheet, View } from "react-native";
import { Subject } from "rxjs";
import { IProductCategory } from "../models/Models";
import { ScrollView } from "react-native-gesture-handler";

export default function SelectCategories(props: {
  dialogVisiblitySubject: Subject<boolean>;
  saveCategoriesSubject: Subject<IProductCategory[]>;
  selectedCategories: IProductCategory[];
}) {
  const [state, setState] = React.useState({
    dialogVisible: false,
    categories: props.selectedCategories.map((x) => x.name), //todo - there should be also ids in final version
  });
  props.dialogVisiblitySubject.subscribe((x) => setState({ ...state, dialogVisible: x }));
  const hideDialog = () => props.dialogVisiblitySubject.next(false);
  const categories = [
    { label: "Sport", value: "sport" },
    { label: "Food", value: "food" },
    { label: "Car", value: "car" },
    { label: "House", value: "house" },
    { label: "Computer", value: "computer" },
    { label: "Education", value: "education" },
    { label: "Friends", value: "friends" },
    { label: "Hobby", value: "hobby" },
    { label: "Books", value: "books" },
    { label: "Clothes", value: "clothes" },
  ];

  const checkboxPressed = (value: string): void => {
    if (state.categories.includes(value)) {
      setState({ ...state, categories: state.categories.filter((c) => c != value) });
    } else {
      setState({ ...state, categories: [...state.categories, value] });
    }
  };

  const saveCategories = () => {
    let mappedCategories = state.categories.map((x) => {
      let mappedCategory: IProductCategory = { id: 0, name: x };
      return mappedCategory;
    });
    props.saveCategoriesSubject.next(mappedCategories);
    hideDialog();
  };

  Alert.alert("Before return component");
  return (
    <Dialog visible={state.dialogVisible} onDismiss={hideDialog} style={{ padding: "10px" }}>
      <Dialog.ScrollArea style={{ maxHeight: "400px" }}>
        <ScrollView>
          {categories !== undefined &&
            categories.map((x) => (
              <View key={x.value}>
                <Text>{x.label}</Text>
                <Checkbox
                  status={state.categories.includes(x.value) ? "checked" : "unchecked"}
                  onPress={() => checkboxPressed(x.value)}
                />
              </View>
            ))}
        </ScrollView>
      </Dialog.ScrollArea>
      <Dialog.Actions>
        <Button mode="contained" onPress={saveCategories}>
          Save categories
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}
