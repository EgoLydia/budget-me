const generateRandColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}

export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

export const deleteItem = ({ key }) => {
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
    return localStorage.removeItem(key)
}