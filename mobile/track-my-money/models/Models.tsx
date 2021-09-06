export interface IProduct {
  id: number;
  name: string;
  amount: number;
  quantity: number;
  category: IProductCategory;
}

export interface IExpense {
  id: number;
  name: string;
  products: IProduct[];
  amount: number;
  category: IExpenseCategory;
}

export interface IIncome {
  id: number;
  name: string;
  price: number;
  category: IIncomeCategory;
}

export interface IIncomeCategory {
  id: number;
  name: string;
}

export interface IExpenseCategory {
  id: number;
  name: string;
}

export interface IProductCategory {
  id: number;
  name: string;
}
