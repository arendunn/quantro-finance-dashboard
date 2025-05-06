import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const Summary = () => {
    const { transactions } = useContext(FinanceContext);

    const totalIncome = transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpense = transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((acc, transaction) => acc + transaction.amount, 0);
    const balance = totalIncome - totalExpense;

    return (
        <div className="summary">
            <h2>Summary</h2>
            <div className="summary-item">
                <h3>Total Income</h3>
                <p>${totalIncome.toFixed(2)}</p>
            </div>
            <div className="summary-item">
                <h3>Total Expense</h3>
                <p>${totalExpense.toFixed(2)}</p>
            </div>
            <div className="summary-item">
                <h3>Balance</h3>
                <p>${balance.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default Summary;