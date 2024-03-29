import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Intro from "../components/Intro";
import Table from "../components/Table";
import { createBudget, createExpense, deleteItem, editItem, fetchData, waitt } from "../helpers"

export function dashboardLoader() {
    const userName = fetchData('userName');
    const budgets = fetchData('budgets');
    const expenses = fetchData('expenses');

    return { userName, budgets, expenses }
}

export async function dashboardAction({ request }) {
    await waitt();

    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data)

    //create new user 
    if (_action === "newUser") {
    try {
        localStorage.setItem("userName", JSON.stringify(values.userName))
        return toast.success(`Welcome, ${values.userName}`)
    } catch (e) {
        throw new Error("There was a problem creating your account.")
    }
    }

    //create budget
    if (_action === "createBudget") {
        try {
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount
            })
            return toast.success("Budget created!")
        } catch (e) {
            throw new Error("There was a problem creating your budget.")

        }
    }

    //create expense
    if (_action === "createExpense") {
        try {
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            })
            return toast.success(`Expense ${values.newExpense} created!`)
        } catch (e) {
            throw new Error("There was a problem creating your expense.")

        }
    }

    //delete expense
    if (_action === "deleteExpense") {
        try {
            deleteItem({
                key: 'expenses',
                id: values.expenseId
            })
            return toast.success("Expense Deleted!")
        } catch (e) {
            throw new Error("There was a problem deleting your expense.")

        }
    }

    //edit expense
    // if (_action === "editExpense") {
    //     try {
    //         editItem({
    //             key: 'expenses',
    //             id: values.editExpenseId
    //         })
    //         return toast.success("Expense Updated!")
    //     } catch (e) {
    //         throw new Error("There was a problem updating your expense.")

    //     }
    // }

}

const Dashboard = () => {
    const { userName, budgets, expenses } = useLoaderData();

    return (

        <>
            {userName ? (<div className="dashboard">
                <h1>Welcome back, <span className="accent">{userName}</span></h1>
                <div className="grid-lg">
                    {budgets && budgets.length > 0 ? (
                        <div className="grid-lg">
                        <div className="flex-lg">
                                <AddBudgetForm />
                                <AddExpenseForm budgets={budgets} />
                            </div>
                            <h2>Existing Budgets</h2>
                            <div className="budgets">
                                {
                                    budgets.map((budget) => (
                                        <BudgetItem key={budget.id} budget={budget} />
                                    ))
                                }
                            </div>
                            {
                                expenses && expenses.length > 0 && (
                                    <div className="grid-md">
                                        <h2>Recent Expenses</h2>
                                        <Table
                                            expenses={expenses.sort((a, b) => b.createdAt - a.createdAt
                                            ).slice(0, 8)}
                                        />
                                        {expenses.length > 8 && (
                                            <Link to="/expenses" className="btn btn--dark">
                                                View all expenses
                                            </Link>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <div className="grid-sm">
                            <p>Personal Budgeting: The secret to financial freedom.</p>
                            <p>Create a budget to get started!</p>
                            <AddBudgetForm />

                        </div>
                    )}

                </div>
            </div>) : <Intro />}
        </>
    )
}

export default Dashboard