import * as React from "react";
import { TextInput, Button, Paragraph, Dialog, Portal, Provider, Card } from "react-native-paper";
import { Subject } from "rxjs";
import { Label } from "semantic-ui-react";
import { IProduct, IProductCategory } from "../models/Models";

export default function AddProduct(props: {
  dialogVisiblitySubject: Subject<boolean>;
  addProductSubject: Subject<IProduct>;
}) {
  const defaultState = {
    dialogVisible: false,
    id: 0,
    name: "",
    amount: 0,
    quantity: 1,
    category: { id: 0, name: "Test" } as IProductCategory,
  };
  const [state, setState] = React.useState(defaultState);
  const resetState = (): void => {
    setState({
      ...state,
      dialogVisible: defaultState.dialogVisible,
      id: defaultState.id,
      name: defaultState.name,
      amount: defaultState.amount,
      quantity: defaultState.quantity,
      category: defaultState.category,
    });
  };

  props.dialogVisiblitySubject.subscribe((x) => setState({ ...state, dialogVisible: x }));

  const saveProduct = () => {
    const product: IProduct = {
      id: state.id,
      name: state.name,
      amount: state.amount,
      quantity: state.quantity,
      category: state.category,
    };
    console.log(product);
    props.addProductSubject.next(product);
    resetState();
  };
  const hideDialog = () => props.dialogVisiblitySubject.next(false);

  return (
    <Provider>
      <Portal>
        <Dialog visible={state.dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Add product</Dialog.Title>
          <Dialog.Content>
            <form>
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
              <Button mode="contained" onPress={saveProduct}>
                Add another product
              </Button>
            </form>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
}
