import * as React from "react";
import {
  TextInput,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  Card,
  Modal,
  Surface,
  Text,
  DefaultTheme,
  DarkTheme,
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import { Subject } from "rxjs";
import { IProduct, IProductCategory } from "../models/Models";
import SelectCategories from "./SelectCategories";
import { View } from "./Themed";

export default function AddProduct(props: {
  dialogVisiblitySubject: Subject<boolean>;
  addProductSubject: Subject<IProduct>;
}) {
  const [state, setState] = React.useState({
    dialogVisible: false,
    showDropDown: false,
    id: 0,
    name: "",
    amount: 0,
    quantity: 1,
    categories: [] as IProductCategory[],
  });

  props.dialogVisiblitySubject.subscribe((x) => setState({ ...state, dialogVisible: x }));

  const saveProduct = () => {
    const product: IProduct = {
      id: state.id,
      name: state.name,
      amount: state.amount,
      quantity: state.quantity,
      categories: state.categories,
    };
    console.log(product);
    props.addProductSubject.next(product);
    hideDialog();
  };
  const hideDialog = () => props.dialogVisiblitySubject.next(false);

  const categoriesDialogVisibleSubject = new Subject<boolean>();
  const saveCategoriesSubject = new Subject<IProductCategory[]>();
  saveCategoriesSubject.subscribe((x) => setState({ ...state, categories: x }));

  return (
    <Provider>
      <Portal>
        <Dialog visible={state.dialogVisible} onDismiss={hideDialog} theme={DarkTheme}>
          <Dialog.Content>
            <Text>Add product</Text>
            <TextInput
              label="Name"
              value={state.name.toString()}
              onChangeText={(x) => setState({ ...state, name: x })}
              mode={"outlined"}
            />
            <TextInput
              label="Amount"
              value={state.amount.toString()}
              onChangeText={(x) => {
                if (x === null || x === undefined || x === "") {
                  x = "0";
                }
                setState({ ...state, amount: parseFloat(x) });
              }}
              mode={"outlined"}
              keyboardType={"numeric"}
            />
            <TextInput
              label="Quantity"
              value={state.quantity.toString()}
              onChangeText={(x) => {
                if (x === null || x === undefined || x === "") {
                  x = "0";
                }
                setState({ ...state, quantity: parseFloat(x) });
              }}
              mode={"outlined"}
              keyboardType={"numeric"}
            />
            {state.categories !== undefined && state.categories.length > 0 && <Text>Categories:</Text>}
            {state.categories.map((x) => (
              <Text key={x.name}>{x.name}</Text>
            ))}
            <Button mode="contained" onPress={() => categoriesDialogVisibleSubject.next(true)}>
              Select categories
            </Button>
            <Button mode="contained" onPress={saveProduct}>
              Save product
            </Button>
            <SelectCategories
              dialogVisiblitySubject={categoriesDialogVisibleSubject}
              saveCategoriesSubject={saveCategoriesSubject}
              selectedCategories={state.categories}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </Provider>
  );
}
