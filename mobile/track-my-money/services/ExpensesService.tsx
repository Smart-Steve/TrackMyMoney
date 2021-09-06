import FilesService from "../services/FilesService";
import { IExpense } from "../models/Models";

export default class ExpensesService {
  private filesService = new FilesService();
  private expensesKey = "Expenses";

  public async AddExpense(expense: IExpense): Promise<void> {
    const expenses = await this.GetExpenses();
    expenses.push(expense);
    await this.filesService.save(this.expensesKey, JSON.stringify(expenses));
  }

  public async GetExpenses(): Promise<IExpense[]> {
    const expenses = JSON.parse((await this.filesService.get(this.expensesKey)) ?? "[]") as IExpense[];
    return expenses;
  }
}
