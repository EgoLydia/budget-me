import { Link, useFetcher } from "react-router-dom";
import { formatCurrency, formatDateToString, getAllMatchingItems } from "../helpers"
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid'


const ExpenseItem = ({ expense, showBudget }) => {
    const fetcher = useFetcher()
    const budget = getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: expense.budgetId
    })[0];

    return (
        <>
            <td>{expense.name}</td>
            <td>{formatCurrency(expense.amount)}</td>
            <td>{formatDateToString(expense.createdAt)}</td>
            {showBudget && (
                <td>
                    <Link style={{ "--accent": budget.color }}
                        to={`/budget/${budget.id}`}>{budget.name}
                    </Link>
                </td>
            )}
            <td>
                <fetcher.Form method="post">
                    <input type="hidden" name="_action" value="deleteExpense" />
                    <input type="hidden" name="expenseId" value={expense.id} />
                    <button type="submit" className="btn btn--warning" aria-label={`Delete ${expense.name} expense`}>
                        <TrashIcon width={20} />
                    </button>
                </fetcher.Form>
            </td>
            {/* <td>
                <fetcher.Form method="post">
                    <input type="hidden" name="_action" value="editExpense" />
                    <input type="hidden" name="editExpenseId" value={expense.id} />
                    <button type="submit" className="btn btn--dark" aria-label={`Edit ${expense.name} expense`}>
                        <PencilIcon width={20} />
                    </button>
                </fetcher.Form>
            </td> */}

        </>
    )
}

export default ExpenseItem