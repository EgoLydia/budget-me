export const waitt = () => new Promise(res => setTimeout(res, Math.random() * 800))

const generateRandColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

//delete user
// export const deleteItem = ({ key }) => {
//     return localStorage.removeItem(key)
// }

//create budget
export const createBudget = ({ name, amount }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandColor()
    }
    const existingBudgets = fetchData("budgets") ?? [];

    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}

//create expense
export const createExpense = ({ name, amount, budgetId }) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }
    const existingExpenses = fetchData("expenses") ?? [];

    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}

//get all items from LS
export const getAllMatchingItems = ({ category, key, value }) => {
    const data = fetchData(category) ?? []
    return data.filter((item) => item[key] === value)
}

//delete expense item
export const deleteItem = ({ key, id }) => {
    const existingData = fetchData(key)
    if (id) {
        const newData = existingData.filter((item) => item.id !== id)
        return localStorage.setItem(key, JSON.stringify(newData))

    }
    return localStorage.removeItem(key)
}

//edit expense item
export const editItem = ({ key, id }) => {
    const data = fetchData(key)

    // return localStorage.removeItem(key)
}

//formatting
//currency
export const formatCurrency = (amount) => {
    return amount.toLocaleString(undefined, {
        style: 'currency',
        currency: 'NGN'
    }
    )
}

//percentage
export const formatPercentage = (amount) => {
    return amount.toLocaleString(undefined, {
        style: 'percent',
        minimumFractionDigits: 0,
    })
}

//date

export const formatDateToString = (epoch) => {
    return new Date(epoch).toLocaleDateString()
}

//total spent by budget
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        if (expense.budgetId !== budgetId) return acc

        return acc += expense.amount
    }, 0)
    return budgetSpent;
}
