export interface IProduct {
  name: string;
  price: number;
}

export interface IExpense {
  product: IProduct;
  quantity: number;
  amount: number;
}

export interface IIncome {}
