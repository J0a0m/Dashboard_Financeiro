const transactionList = document.querySelector("#transactionList");
const emptyMessage = document.querySelector("#emptyMessage");

const balanceElement = document.querySelector("#balance");
const incomeElement = document.querySelector("#income");
const expensesElement = document.querySelector("#expenses");

const modal = document.querySelector("#modal");
const addTransactionButton = document.querySelector("#addTransaction");
const closeModalButton = document.querySelector("#closeModal");
const cancelButton = document.querySelector("#cancelButton");

const transactionForm = document.querySelector("#transactionForm");

const monthFilter = document.querySelector("#monthFilter");

const descriptionInput = document.querySelector("#description");
const amountInput = document.querySelector("#amount");
const categoryInput = document.querySelector("#category");
const dateInput = document.querySelector("#date");

/* =========================
DADOS
========================= */

let transactions = JSON.parse(
localStorage.getItem("transactions")
) || [
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

/* =========================
FORMATAÇÃO
========================= */

function formatCurrency(value) {

return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
}).format(value);


}

function formatDate(date) {

const [year, month, day] = date.split("-");

return `${day}/${month}/${year}`;


}

/* =========================
SALVAR
========================= */

function saveTransactions() {

localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
);


}

/* =========================
FILTRO
========================= */

function getFilteredTransactions() {

const selectedMonth = monthFilter.value;

if (selectedMonth === "all") {
    return transactions;
}

return transactions.filter(transaction => {

    const month = transaction.date.split("-")[1];

    return month === selectedMonth;

});


}

/* =========================
RESUMO
========================= */

function updateSummary() {

const filteredTransactions =
    getFilteredTransactions();

const income = filteredTransactions
    .filter(transaction => transaction.type === "income")
    .reduce(
        (total, transaction) =>
            total + transaction.amount,
        0
    );

const expenses = filteredTransactions
    .filter(transaction => transaction.type === "expense")
    .reduce(
        (total, transaction) =>
            total + transaction.amount,
        0
    );

const balance = income - expenses;


balanceElement.textContent =
    formatCurrency(balance);

incomeElement.textContent =
    formatCurrency(income);

expensesElement.textContent =
    formatCurrency(expenses);


}

/* =========================
ÍCONE DA CATEGORIA
========================= */

function getCategoryIcon(category) {

const icons = {

    "Alimentação": "🍔",

    "Transporte": "🚗",

    "Moradia": "🏠",

    "Lazer": "🎮",

    "Saúde": "🏥",

    "Educação": "📚",

    "Salário": "💼",

    "Outros": "📦"

};

return icons[category] || "💰";


}

/* =========================
RENDERIZAR TRANSAÇÕES
========================= */

function renderTransactions() {

const filteredTransactions =
    getFilteredTransactions();

transactionList.innerHTML = "";


if (filteredTransactions.length === 0) {

    emptyMessage.style.display = "block";

    return;

}


emptyMessage.style.display = "none";


const sortedTransactions =
    [...filteredTransactions].sort(
        (a, b) =>
            new Date(b.date) -
            new Date(a.date)
    );


sortedTransactions.forEach(transaction => {

    const transactionElement =
        document.createElement("div");

    transactionElement.classList.add(
        "transaction"
    );


    const sign =
        transaction.type === "income"
            ? "+"
            : "-";


    transactionElement.innerHTML = `

        <div class="transaction-info">

            <div class="transaction-icon">
                ${getCategoryIcon(transaction.category)}
            </div>

            <div>

                <div class="transaction-description">
                    ${transaction.description}
                </div>

                <div class="transaction-meta">
                    ${transaction.category}
                    ·
                    ${formatDate(transaction.date)}
                </div>

            </div>

        </div>


        <div class="transaction-right">

            <span
                class="transaction-amount ${transaction.type}"
            >
                ${sign} ${formatCurrency(transaction.amount)}
            </span>

            <button
                class="delete-button"
                data-id="${transaction.id}"
                title="Excluir transação"
            >
                🗑️
            </button>

        </div>

    `;


    transactionList.appendChild(
        transactionElement
    );

});


}

/* =========================
ATUALIZAR DASHBOARD
========================= */

function updateDashboard() {

updateSummary();

renderTransactions();


}

/* =========================
MODAL
========================= */

function openModal() {

modal.classList.add("active");

descriptionInput.focus();


}

function closeModal() {

modal.classList.remove("active");

transactionForm.reset();

setTodayDate();


}

/* =========================
DATA ATUAL
========================= */

function setTodayDate() {

const today =
    new Date().toISOString().split("T")[0];

dateInput.value = today;


}

/* =========================
ADICIONAR TRANSAÇÃO
========================= */

transactionForm.addEventListener(
"submit",
function (event) {

    event.preventDefault();


    const description =
        descriptionInput.value.trim();

    const amount =
        Number(amountInput.value);

    const type =
        document.querySelector(
            'input[name="type"]:checked'
        ).value;

    const category =
        categoryInput.value;

    const date =
        dateInput.value;


    if (
        !description ||
        !amount ||
        !category ||
        !date
    ) {

        alert(
            "Preencha todos os campos."
        );

        return;

    }


    const newTransaction = {

        id: Date.now(),

        description,

        amount,

        type,

        category,

        date

    };


    transactions.push(
        newTransaction
    );


    saveTransactions();

    updateDashboard();

    closeModal();

}


);

/* =========================
EXCLUIR TRANSAÇÃO
========================= */

transactionList.addEventListener(
"click",
function (event) {

    const button =
        event.target.closest(
            ".delete-button"
        );


    if (!button) {
        return;
    }


    const id =
        Number(button.dataset.id);



    transactions =
        transactions.filter(
            transaction =>
                transaction.id !== id
        );


    saveTransactions();

    updateDashboard();

}


);

/* =========================
EVENTOS DO MODAL
========================= */

addTransactionButton.addEventListener(
"click",
openModal
);

closeModalButton.addEventListener(
"click",
closeModal
);

cancelButton.addEventListener(
"click",
closeModal
);

modal.addEventListener(
"click",
function (event) {

    if (event.target === modal) {
        closeModal();
    }

}


);

/* =========================
FILTRO DE MÊS
========================= */

monthFilter.addEventListener(
"change",
updateDashboard
);

/* =========================
INICIALIZAÇÃO
========================= */

setTodayDate();

updateDashboard();