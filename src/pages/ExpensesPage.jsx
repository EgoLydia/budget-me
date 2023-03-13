import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "../components/Table";
import { deleteItem, editItem, fetchData } from "../helpers";

export async function expensesLoader() {
    const expenses = fetchData('expenses');

    return { expenses }
}

export async function expensesAction({ request }) {
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data)

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

const ExpensesPage = () => {
    const { expenses } = useLoaderData();

    return (
        <div className="grid-lg">
            <h1>All Expense</h1>
            {
                expenses && expenses.length > 0 ? (
                    <div className="grid-md">
                        <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                        <Table expenses={expenses} />
                    </div>
                ) :
                    <p>No Expenses to show</p>
            }
        </div >
    )
}

export default ExpensesPage