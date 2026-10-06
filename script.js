let transactions = [
    {
        id: 1,
        description: "Salário",
        amount: 5000,
        type: "income",
        category: "Salário",
        date: "2026-10-05"
    },

    {
        id: 2,
        description: "Supermercado",
        amount: 250,
        type: "expense",
        category: "Alimentação",
        date: "2026-10-05"
    },

    {
        id: 3,
        description: "Uber",
        amount: 30,
        type: "expense",
        category: "Transporte",
        date: "2026-10-06"
    }
];

function updateSummary() {

    const income = transactions
        .filter(transaction => transaction.type === "income")
        .reduce((total, transaction) => {
            return total + transaction.amount;
        }, 0);

    const expenses = transactions
        .filter(transaction => transaction.type === "expense")
        .reduce((total, transaction) => {
            return total + transaction.amount;
        }, 0);

    const balance = income - expenses;

    document.querySelector("#income").textContent =
        `R$ ${income.toFixed(2)}`;

    document.querySelector("#expenses").textContent =
        `R$ ${expenses.toFixed(2)}`;

    document.querySelector("#balance").textContent =
        `R$ ${balance.toFixed(2)}`;
}

updateSummary();
