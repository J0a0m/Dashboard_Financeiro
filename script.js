/* =========================================================
   FINANCE DASHBOARD
   Controle financeiro pessoal
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

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

const savingRateElement =
    document.querySelector("#savingRate");

const transactionList =
    document.querySelector("#transactionList");

const emptyMessage =
    document.querySelector("#emptyMessage");

const transactionCount =
    document.querySelector("#transactionCount");

const monthFilter =
    document.querySelector("#monthFilter");

const searchTransaction =
    document.querySelector("#searchTransaction");

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

const descriptionInput =
    document.querySelector("#description");

const amountInput =
    document.querySelector("#amount");

const categoryInput =
    document.querySelector("#category");

const dateInput =
    document.querySelector("#date");

const donutChart =
    document.querySelector("#donutChart");

const donutValue =
    document.querySelector("#donutValue");

const expenseRatio =
    document.querySelector("#expenseRatio");

const legendIncome =
    document.querySelector("#legendIncome");

const legendExpense =
    document.querySelector("#legendExpense");

const financialScore =
    document.querySelector("#financialScore");

const healthScore =
    document.querySelector("#healthScore");

const healthStatus =
    document.querySelector("#healthStatus");

const healthDescription =
    document.querySelector("#healthDescription");

const healthSaving =
    document.querySelector("#healthSaving");

const healthExpenses =
    document.querySelector("#healthExpenses");

const healthBalance =
    document.querySelector("#healthBalance");

const budgetLimit =
    document.querySelector("#budgetLimit");

const budgetUsed =
    document.querySelector("#budgetUsed");

const budgetProgress =
    document.querySelector("#budgetProgress");

const budgetPercentage =
    document.querySelector("#budgetPercentage");

const marketStatus =
    document.querySelector("#marketStatus");

const quotesElement =
    document.querySelector("#quotes");

const financialTipTitle =
    document.querySelector("#financialTipTitle");

const financialTip =
    document.querySelector("#financialTip");

const nextTip =
    document.querySelector("#nextTip");


/* =========================================================
   CONFIGURAÇÕES
========================================================= */

const STORAGE_KEY =
    "finance_transactions";

const BUDGET_KEY =
    "finance_budget";


let budget =
    Number(
        localStorage.getItem(BUDGET_KEY)
    ) || 3000;


let activeTypeFilter =
    "all";


/* =========================================================
   TRANSAÇÕES
========================================================= */

let transactions =
    JSON.parse(
        localStorage.getItem(STORAGE_KEY)
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
            description: "Transporte",
            amount: 30,
            type: "expense",
            category: "Transporte",
            date: "2026-10-06"
        }

    ];


/* =========================================================
   ÍCONES SVG
========================================================= */

const icons = {

    "Alimentação":
        "M6 3v8M3 3v5a3 3 0 0 0 3 3m0 0v10M15 3v18M15 3c4 0 6 2 6 5s-2 5-6 5",

    "Transporte":
        "M5 17h14l-1-8H6l-1 8Zm2-8 2-4h6l2 4M8 20h2M14 20h2",

    "Moradia":
        "M3 11 12 4l9 7M5 10v10h14V10M9 20v-5h6v5",

    "Lazer":
        "M7 7h10a4 4 0 0 1 4 4v3a3 3 0 0 1-5 2l-2-2h-4l-2 2a3 3 0 0 1-5-2v-3a4 4 0 0 1 4-4",

    "Saúde":
        "M12 21s-8-4.7-8-11a4.5 4.5 0 0 1 8-2.7A4.5 4.5 0 0 1 20 10c0 6.3-8 11-8 11Z",

    "Educação":
        "M4 19V6a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2Zm0 0c0-1.1.9-2 2-2h13",

    "Salário":
        "M4 7h16v12H4zM8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 11h16",

    "Investimentos":
        "M4 19V5M4 19h16M7 15l4-4 3 2 5-7",

    "Outros":
        "M4 7h16v13H4zM8 7V5h8v2M9 13h6"

};


/* =========================================================
   DICAS
========================================================= */

const tips = [

    {
        title: "Pague você primeiro.",
        text:
            "Assim que receber, separe uma parte da sua renda para seus objetivos antes de começar a gastar."
    },

    {
        title: "Monte uma reserva.",
        text:
            "Uma reserva de emergência ajuda a lidar com imprevistos sem precisar recorrer a dívidas."
    },

    {
        title: "Conheça seus gastos.",
        text:
            "Registrar suas despesas mostra para onde seu dinheiro realmente está indo."
    },

    {
        title: "Cuidado com gastos recorrentes.",
        text:
            "Pequenas assinaturas mensais podem representar uma parcela significativa da sua renda ao longo do ano."
    },

    {
        title: "Evite juros desnecessários.",
        text:
            "Sempre que possível, pague suas contas em dia e evite carregar dívidas de cartão de crédito."
    },

    {
        title: "Defina objetivos claros.",
        text:
            "Uma meta financeira específica facilita decidir quanto guardar todos os meses."
    }

];


let currentTip = 0;


/* =========================================================
   FORMATAÇÃO
========================================================= */

function formatCurrency(value) {

    return new Intl.NumberFormat(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    ).format(value);

}


function formatCompact(value) {

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


function formatDate(date) {

    const [
        year,
        month,
        day
    ] = date.split("-");

    return `${day}/${month}/${year}`;

}


/* =========================================================
   SEGURANÇA
========================================================= */

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

            })[char]
        );

}


/* =========================================================
   SALVAR
========================================================= */

function saveTransactions() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactions)
    );

}


/* =========================================================
   FILTROS
========================================================= */

function getFilteredTransactions() {

    const month =
        monthFilter.value;

    const search =
        searchTransaction.value
            .trim()
            .toLowerCase();


    return transactions.filter(
        transaction => {

            const matchesMonth =
                month === "all"
                ||
                transaction.date.split("-")[1]
                === month;


            const matchesType =
                activeTypeFilter === "all"
                ||
                transaction.type
                === activeTypeFilter;


            const matchesSearch =
                !search
                ||
                transaction.description
                    .toLowerCase()
                    .includes(search)
                ||
                transaction.category
                    .toLowerCase()
                    .includes(search);


            return (
                matchesMonth &&
                matchesType &&
                matchesSearch
            );

        }
    );

}


/* =========================================================
   RESUMO
========================================================= */

function calculateSummary() {

    const filtered =
        getFilteredTransactions();


    const income =
        filtered
            .filter(
                item =>
                    item.type === "income"
            )
            .reduce(
                (total, item) =>
                    total + item.amount,
                0
            );


    const expenses =
        filtered
            .filter(
                item =>
                    item.type === "expense"
            )
            .reduce(
                (total, item) =>
                    total + item.amount,
                0
            );


    const balance =
        income - expenses;


    const savingRate =
        income > 0
            ? Math.max(
                0,
                (balance / income) * 100
            )
            : 0;


    return {
        filtered,
        income,
        expenses,
        balance,
        savingRate
    };

}


/* =========================================================
   DASHBOARD
========================================================= */

function updateSummary() {

    const {

        filtered,
        income,
        expenses,
        balance,
        savingRate

    } = calculateSummary();


    balanceElement.textContent =
        formatCurrency(balance);


    incomeElement.textContent =
        formatCurrency(income);


    expensesElement.textContent =
        formatCurrency(expenses);


    savingRateElement.textContent =
        `${Math.round(savingRate)}%`;


    balanceStatus.textContent =
        balance >= 0
            ? "Resultado positivo no período"
            : "Despesas acima das receitas";


    const maximum =
        Math.max(
            income,
            expenses,
            1
        );


    incomeBar.style.width =
        `${Math.min(
            100,
            (income / maximum) * 100
        )}%`;


    expenseBar.style.width =
        `${Math.min(
            100,
            (expenses / maximum) * 100
        )}%`;


    updateChart(
        income,
        expenses
    );


    updateHealth(
        income,
        expenses,
        balance,
        savingRate
    );


    updateBudget(
        expenses
    );

}


/* =========================================================
   GRÁFICO
========================================================= */

function updateChart(
    income,
    expenses
) {

    const total =
        income + expenses;


    const percentage =
        total > 0
            ? Math.round(
                (expenses / total) * 100
            )
            : 0;


    const angle =
        percentage * 3.6;


    donutChart.style.background =
        `conic-gradient(
            var(--red)
            0deg ${angle}deg,
            #242424
            ${angle}deg 360deg
        )`;


    expenseRatio.textContent =
        `${percentage}%`;


    donutValue.textContent =
        formatCompact(expenses);


    legendIncome.textContent =
        formatCompact(income);


    legendExpense.textContent =
        formatCompact(expenses);

}


/* =========================================================
   SAÚDE FINANCEIRA
========================================================= */

function updateHealth(
    income,
    expenses,
    balance,
    savingRate
) {

    let score = 0;


    if (income > 0) {

        if (savingRate >= 20) {
            score += 45;
        } else {
            score +=
                Math.max(
                    0,
                    savingRate * 2
                );
        }

    }


    if (
        income > 0 &&
        expenses <= income * 0.7
    ) {

        score += 30;

    } else if (
        income > 0 &&
        expenses <= income
    ) {

        score += 15;

    }


    if (balance > 0) {

        score += 25;

    }


    score =
        Math.round(
            Math.min(
                100,
                score
            )
        );


    financialScore.textContent =
        score;


    healthScore.textContent =
        score;


    healthSaving.textContent =
        `${Math.round(savingRate)}%`;


    const expenseRate =
        income > 0
            ? (expenses / income) * 100
            : 0;


    healthExpenses.textContent =
        `${Math.round(
            Math.min(
                expenseRate,
                100
            )
        )}%`;


    healthBalance.textContent =
        balance >= 0
            ? "Positivo"
            : "Negativo";


    if (score >= 80) {

        healthStatus.textContent =
            "Excelente";

        healthDescription.textContent =
            "Você está mantendo bons hábitos financeiros.";

    } else if (score >= 60) {

        healthStatus.textContent =
            "Saudável";

        healthDescription.textContent =
            "Sua organização financeira está no caminho certo.";

    } else if (score >= 40) {

        healthStatus.textContent =
            "Atenção";

        healthDescription.textContent =
            "Existem pontos que podem ser melhorados.";

    } else {

        healthStatus.textContent =
            "Precisa melhorar";

        healthDescription.textContent =
            "Comece controlando gastos e criando uma reserva.";

    }

}


/* =========================================================
   ORÇAMENTO
========================================================= */

function updateBudget(expenses) {

    budgetLimit.textContent =
        formatCurrency(budget);


    budgetUsed.textContent =
        formatCurrency(expenses);


    const percentage =
        budget > 0
            ? (expenses / budget) * 100
            : 0;


    budgetProgress.style.width =
        `${Math.min(
            percentage,
            100
        )}%`;


    budgetPercentage.textContent =
        `${Math.round(
            percentage
        )}% utilizado`;


    if (percentage > 100) {

        budgetProgress.style.background =
            "var(--red)";

    } else {

        budgetProgress.style.background =
            "linear-gradient(90deg,var(--orange),var(--orange-light))";

    }

}


/* =========================================================
   ÍCONE DA CATEGORIA
========================================================= */

function categoryIcon(category) {

    const path =
        icons[category]
        ||
        icons["Outros"];


    return `
        <svg viewBox="0 0 24 24">
            <path d="${path}"/>
        </svg>
    `;

}


/* =========================================================
   RENDERIZAÇÃO
========================================================= */

function renderTransactions() {

    const filtered =
        [...getFilteredTransactions()]
            .sort(
                (a, b) =>
                    new Date(b.date)
                    -
                    new Date(a.date)
            );


    transactionList.innerHTML =
        "";


    emptyMessage.hidden =
        filtered.length !== 0;


    if (transactionCount) {

        transactionCount.textContent =
            `${filtered.length} ${
                filtered.length === 1
                    ? "registro"
                    : "registros"
            }`;

    }


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

                        <div class="transaction-description">

                            ${escapeHtml(
                                transaction.description
                            )}

                        </div>

                        <div class="transaction-meta">

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
                        class="transaction-amount ${transaction.type}"
                    >

                        ${sign}
                        ${formatCurrency(
                            transaction.amount
                        )}

                    </span>


                    <button
                        class="delete-button"
                        data-id="${transaction.id}"
                        aria-label="Excluir transação"
                    >

                        <svg viewBox="0 0 24 24">

                            <path d="M4 7h16"/>
                            <path d="M10 11v6"/>
                            <path d="M14 11v6"/>
                            <path d="M6 7l1 14h10l1-14"/>
                            <path d="M9 7V4h6v3"/>

                        </svg>

                    </button>

                </div>

            `;


            transactionList.appendChild(
                element
            );

        }
    );

}


/* =========================================================
   ATUALIZAÇÃO
========================================================= */

function updateDashboard() {

    updateSummary();

    renderTransactions();

}


/* =========================================================
   MODAL
========================================================= */

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

    setTodayDate();

}


/* =========================================================
   DATA
========================================================= */

function setTodayDate() {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    dateInput.value =
        today;

}


/* =========================================================
   ADICIONAR TRANSAÇÃO
========================================================= */

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


/* =========================================================
   EXCLUIR
========================================================= */

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


/* =========================================================
   FILTROS
========================================================= */

document
    .querySelectorAll(".filter-chip")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".filter-chip"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );


                    activeTypeFilter =
                        button.dataset.filter;


                    updateDashboard();

                }
            );

        }
    );


monthFilter.addEventListener(
    "change",
    updateDashboard
);


searchTransaction.addEventListener(
    "input",
    updateDashboard
);


/* =========================================================
   MODAL EVENTOS
========================================================= */

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


/* =========================================================
   ORÇAMENTO
========================================================= */

document
    .querySelector("#editBudget")
    .addEventListener(
        "click",
        () => {

            const value =
                prompt(
                    "Digite seu limite mensal de gastos:",
                    budget
                );


            if (
                value === null
            ) {

                return;

            }


            const newBudget =
                Number(
                    value.replace(
                        ",",
                        "."
                    )
                );


            if (
                !newBudget ||
                newBudget <= 0
            ) {

                alert(
                    "Digite um valor válido."
                );

                return;

            }


            budget =
                newBudget;


            localStorage.setItem(
                BUDGET_KEY,
                budget
            );


            updateDashboard();

        }
    );


/* =========================================================
   DICAS
========================================================= */

nextTip.addEventListener(
    "click",
    () => {

        currentTip++;

        if (
            currentTip >= tips.length
        ) {

            currentTip = 0;

        }


        financialTipTitle.textContent =
            tips[currentTip].title;


        financialTip.textContent =
            tips[currentTip].text;

    }
);


/* =========================================================
   NAVEGAÇÃO
========================================================= */

document
    .querySelectorAll(".nav-item")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".nav-item"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );


                    const section =
                        document.getElementById(
                            button.dataset.section
                        );


                    if (section) {

                        section.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }
    );


/* =========================================================
   API DE MERCADO
========================================================= */

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


        const assets = [

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
            "";


        assets.forEach(
            asset => {

                const quote =
                    data[asset.key];


                if (!quote) {
                    return;
                }


                const change =
                    Number(
                        quote.pctChange || 0
                    );


                const value =
                    Number(
                        quote.bid
                    );


                const formatted =
                    asset.key === "BTCBRL"

                        ? formatCompact(
                            value
                        )

                        : formatCurrency(
                            value
                        );


                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "quote";


                item.innerHTML = `

                    <div>

                        <div class="quote-name">
                            ${asset.name}
                        </div>

                        <div class="quote-symbol">
                            ${asset.symbol}
                        </div>

                    </div>


                    <div class="quote-value">

                        ${formatted}

                        <span
                            class="quote-change ${
                                change >= 0
                                    ? "positive"
                                    : "negative"
                            }"
                        >

                            ${
                                change >= 0
                                    ? "+"
                                    : ""
                            }

                            ${change.toFixed(2)}%

                        </span>

                    </div>

                `;


                quotesElement.appendChild(
                    item
                );

            }
        );


        marketStatus.innerHTML =
            "<span></span> AO VIVO";

    }

    catch (error) {

        console.error(
            "Erro nas cotações:",
            error
        );


        marketStatus.textContent =
            "INDISPONÍVEL";


        quotesElement.innerHTML = `

            <div class="quote">

                <div>

                    <div class="quote-name">
                        Mercado indisponível
                    </div>

                    <div class="quote-symbol">
                        Tente novamente mais tarde.
                    </div>

                </div>

            </div>

        `;

    }

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

setTodayDate();

updateDashboard();

loadMarketQuotes();


setInterval(
    loadMarketQuotes,
    5 * 60 * 1000
);