const transactionList =
    document.querySelector("#transactionList");

const emptyMessage =
    document.querySelector("#emptyMessage");

const balanceElement =
    document.querySelector("#balance");

const incomeElement =
    document.querySelector("#income");

const expensesElement =
    document.querySelector("#expenses");

const balanceStatus =
    document.querySelector("#balanceStatus");

const incomeBar =
    document.querySelector("#incomeBar");

const expenseBar =
    document.querySelector("#expenseBar");

const transactionCount =
    document.querySelector("#transactionCount");

const expenseRatio =
    document.querySelector("#expenseRatio");

const donutChart =
    document.querySelector("#donutChart");

const donutValue =
    document.querySelector("#donutValue");

const legendIncome =
    document.querySelector("#legendIncome");

const legendExpense =
    document.querySelector("#legendExpense");

const modal =
    document.querySelector("#modal");

const addTransactionButton =
    document.querySelector("#addTransaction");

const closeModalButton =
    document.querySelector("#closeModal");

const cancelButton =
    document.querySelector("#cancelButton");

const transactionForm =
    document.querySelector("#transactionForm");

const monthFilter =
    document.querySelector("#monthFilter");

const descriptionInput =
    document.querySelector("#description");

const amountInput =
    document.querySelector("#amount");

const categoryInput =
    document.querySelector("#category");

const dateInput =
    document.querySelector("#date");

const quotesElement =
    document.querySelector("#quotes");

const marketStatus =
    document.querySelector("#marketStatus");


/*
========================================
ÍCONES
========================================
*/

const iconMap = {

    "Alimentação":
        "M6 3v8M3 3v5a3 3 0 0 0 3 3m0 0v10M15 3v18M15 3c4 0 6 2 6 5s-2 5-6 5",

    "Transporte":
        "M5 17h14l-1-8H6l-1 8Zm2-8 1-4h8l1 4M8 20h2M14 20h2M7 17v-2m10 2v-2",

    "Moradia":
        "M3 11.5 12 4l9 7.5M5 10v10h14V10M9 20v-5h6v5",

    "Lazer":
        "M7 7h10a4 4 0 0 1 4 4v3a3 3 0 0 1-5.2 2L14 14H10l-1.8 2A3 3 0 0 1 3 14v-3a4 4 0 0 1 4-4Zm1 3v3m-1.5-1.5h3",

    "Saúde":
        "M12 21s-8-4.7-8-11a4.5 4.5 0 0 1 8-2.7A4.5 4.5 0 0 1 20 10c0 6.3-8 11-8 11Z",

    "Educação":
        "M4 19V6a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2Zm0 0c0-1.1.9-2 2-2h13",

    "Salário":
        "M4 7h16v12H4zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 11h16M10 14h4",

    "Outros":
        "M4 7h16v13H4zM8 7V5h8v2M9 13h6"

};


/*
========================================
DADOS
========================================
*/

let transactions =
    JSON.parse(
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


/*
========================================
FORMATAÇÃO
========================================
*/

function formatCurrency(
    value,
    compact = false
) {

    if (
        compact &&
        Math.abs(value) >= 1000
    ) {

        return new Intl.NumberFormat(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL",
                notation: "compact",
                maximumFractionDigits: 1
            }
        ).format(value);

    }


    return new Intl.NumberFormat(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    ).format(value);

}


function formatDate(date) {

    const [
        year,
        month,
        day
    ] = date.split("-");

    return `${day}/${month}/${year}`;

}


/*
========================================
SALVAR
========================================
*/

function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}


/*
========================================
FILTRO
========================================
*/

function getFilteredTransactions() {

    const selectedMonth =
        monthFilter.value;


    if (
        selectedMonth === "all"
    ) {

        return transactions;

    }


    return transactions.filter(
        transaction =>
            transaction.date.split("-")[1]
            === selectedMonth
    );

}


/*
========================================
RESUMO
========================================
*/

function updateSummary() {

    const filtered =
        getFilteredTransactions();


    const income =
        filtered

            .filter(
                transaction =>
                    transaction.type === "income"
            )

            .reduce(
                (sum, transaction) =>
                    sum + transaction.amount,
                0
            );


    const expenses =
        filtered

            .filter(
                transaction =>
                    transaction.type === "expense"
            )

            .reduce(
                (sum, transaction) =>
                    sum + transaction.amount,
                0
            );


    const balance =
        income - expenses;


    const total =
        income + expenses;


    const expensePercent =
        total
            ? Math.round(
                (expenses / total) * 100
            )
            : 0;


    balanceElement.textContent =
        formatCurrency(balance);


    incomeElement.textContent =
        formatCurrency(income);


    expensesElement.textContent =
        formatCurrency(expenses);


    legendIncome.textContent =
        formatCurrency(
            income,
            true
        );


    legendExpense.textContent =
        formatCurrency(
            expenses,
            true
        );


    donutValue.textContent =
        formatCurrency(
            expenses,
            true
        );


    expenseRatio.textContent =
        `${expensePercent}%`;


    transactionCount.textContent =
        `${filtered.length} ${
            filtered.length === 1
                ? "registro"
                : "registros"
        }`;


    balanceStatus.textContent =
        balance >= 0
            ? "Resultado positivo no período"
            : "Atenção ao resultado do período";


    const max =
        Math.max(
            income,
            expenses,
            1
        );


    incomeBar.style.width =
        `${(income / max) * 100}%`;


    expenseBar.style.width =
        `${(expenses / max) * 100}%`;


    const angle =
        expensePercent * 3.6;


    donutChart.style.background =
        `conic-gradient(
            var(--red) 0deg ${angle}deg,
            #242424 ${angle}deg 360deg
        )`;

}


/*
========================================
ÍCONE
========================================
*/

function categoryIcon(category) {

    const path =
        iconMap[category]
        || iconMap.Outros;


    return `
        <svg viewBox="0 0 24 24">
            <path d="${path}"/>
        </svg>
    `;

}


/*
========================================
SEGURANÇA
========================================
*/

function escapeHtml(value) {

    return String(value)
        .replace(
            /[&<>"']/g,
            char => ({

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"

            }[char])
        );

}


/*
========================================
TRANSAÇÕES
========================================
*/

function renderTransactions() {

    const filtered =
        [
            ...getFilteredTransactions()
        ]
            .sort(
                (a, b) =>
                    new Date(b.date)
                    -
                    new Date(a.date)
            );


    transactionList.innerHTML = "";


    emptyMessage.hidden =
        filtered.length !== 0;


    filtered.forEach(
        transaction => {

            const element =
                document.createElement("div");


            element.className =
                "transaction";


            const sign =
                transaction.type === "income"
                    ? "+"
                    : "-";


            element.innerHTML = `

                <div class="transaction-info">

                    <div class="transaction-icon">

                        ${categoryIcon(
                            transaction.category
                        )}

                    </div>


                    <div>

                        <div
                            class="transaction-description"
                        >
                            ${escapeHtml(
                                transaction.description
                            )}
                        </div>


                        <div
                            class="transaction-meta"
                        >
                            ${escapeHtml(
                                transaction.category
                            )}

                            ·

                            ${formatDate(
                                transaction.date
                            )}
                        </div>

                    </div>

                </div>


                <div class="transaction-right">

                    <span
                        class="
                            transaction-amount
                            ${transaction.type}
                        "
                    >

                        ${sign}
                        ${formatCurrency(
                            transaction.amount
                        )}

                    </span>


                    <button
                        class="delete-button"
                        data-id="${transaction.id}"
                        title="Excluir transação"
                        aria-label="Excluir transação"
                    >
                        ×
                    </button>

                </div>

            `;


            transactionList.appendChild(
                element
            );

        }
    );

}


/*
========================================
ATUALIZAR
========================================
*/

function updateDashboard() {

    updateSummary();

    renderTransactions();

}


/*
========================================
MODAL
========================================
*/

function openModal() {

    modal.classList.add(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    descriptionInput.focus();

}


function closeModal() {

    modal.classList.remove(
        "active"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    transactionForm.reset();


    document.querySelector(
        'input[name="type"][value="expense"]'
    ).checked = true;


    setTodayDate();

}


/*
========================================
DATA
========================================
*/

function setTodayDate() {

    dateInput.value =
        new Date()
            .toISOString()
            .split("T")[0];

}


/*
========================================
ADICIONAR
========================================
*/

transactionForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const description =
            descriptionInput.value.trim();


        const amount =
            Number(
                amountInput.value
            );


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
            amount <= 0 ||
            !category ||
            !date
        ) {

            alert(
                "Preencha todos os campos corretamente."
            );

            return;

        }


        transactions.push({

            id: Date.now(),

            description,

            amount,

            type,

            category,

            date

        });


        saveTransactions();

        updateDashboard();

        closeModal();

    }
);


/*
========================================
EXCLUIR
========================================
*/

transactionList.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".delete-button"
            );


        if (!button) {
            return;
        }


        const id =
            Number(
                button.dataset.id
            );


        transactions =
            transactions.filter(
                transaction =>
                    transaction.id !== id
            );


        saveTransactions();

        updateDashboard();

    }
);


/*
========================================
EVENTOS
========================================
*/

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
    event => {

        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);


monthFilter.addEventListener(
    "change",
    updateDashboard
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains(
                "active"
            )
        ) {

            closeModal();

        }

    }
);


/*
========================================
API DE COTAÇÕES
========================================

AwesomeAPI:
https://economia.awesomeapi.com.br

Busca:
USD/BRL
EUR/BRL
BTC/BRL
*/

async function loadMarketQuotes() {

    try {

        marketStatus.innerHTML =
            "<span></span> ATUALIZANDO";


        const response =
            await fetch(
                "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL"
            );


        if (!response.ok) {

            throw new Error(
                "Falha na API"
            );

        }


        const data =
            await response.json();


        const items = [

            {
                key: "USDBRL",
                name: "Dólar americano",
                symbol: "USD / BRL"
            },

            {
                key: "EURBRL",
                name: "Euro",
                symbol: "EUR / BRL"
            },

            {
                key: "BTCBRL",
                name: "Bitcoin",
                symbol: "BTC / BRL"
            }

        ];


        quotesElement.innerHTML =
            items

                .map(item => {

                    const quote =
                        data[item.key];


                    if (!quote) {
                        return "";
                    }


                    const change =
                        Number(
                            quote.pctChange || 0
                        );


                    const cls =
                        change >= 0
                            ? "positive"
                            : "negative";


                    const prefix =
                        change > 0
                            ? "+"
                            : "";


                    const value =
                        item.key === "BTCBRL"

                            ? formatCurrency(
                                Number(
                                    quote.bid
                                ),
                                true
                            )

                            : `R$ ${Number(
                                quote.bid
                            ).toLocaleString(
                                "pt-BR",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }
                            )}`;


                    return `

                        <div class="quote">

                            <div>

                                <div class="quote-name">
                                    ${item.name}
                                </div>

                                <div class="quote-symbol">
                                    ${item.symbol}
                                </div>

                            </div>


                            <div class="quote-value">

                                ${value}

                                <span
                                    class="
                                        quote-change
                                        ${cls}
                                    "
                                >

                                    ${prefix}
                                    ${change.toFixed(2)}%

                                </span>

                            </div>

                        </div>

                    `;

                })

                .join("");


        marketStatus.innerHTML =
            "<span></span> AO VIVO";


    } catch (error) {

        console.error(
            "Erro ao carregar cotações:",
            error
        );


        marketStatus.textContent =
            "INDISPONÍVEL";


        quotesElement.innerHTML = `

            <div class="quote">

                <span class="quote-symbol">
                    Não foi possível carregar
                    as cotações agora.
                </span>

            </div>

        `;

    }

}


/*
========================================
INICIALIZAÇÃO
========================================
*/

setTodayDate();

updateDashboard();

loadMarketQuotes();


/*
Atualiza as cotações
a cada 5 minutos.
*/

setInterval(
    loadMarketQuotes,
    5 * 60 * 1000
);