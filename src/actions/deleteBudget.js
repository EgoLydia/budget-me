import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";

export function deleteBudget({ params }) {
    try {
        deleteItem({
            key: 'budgets',
            id: params.id
        })
        const associatedExp = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id
        })

        associatedExp.forEach((exp) => {
            deleteItem({
                key: 'expenses',
                id: exp.id
            })
        })
        toast.success('Budget deleted successfully!!')
    } catch (err) {
        throw new Error('There was a problem deleting budget')
    }

    return redirect('/')
}