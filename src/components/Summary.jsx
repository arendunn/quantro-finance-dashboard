import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const Summary = () => {
    const { transactions } = useContext(FinanceContext);

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '500px',
    };

    const totalIncome = transactions
        .reduce((acc, transaction) => 
        transaction.transactionType === 'income' ? acc + transaction.amount : acc, 0);
      const totalExpense = transactions
        .reduce((acc, transaction) => 
        transaction.transactionType === 'expense' ? acc + transaction.amount : acc, 0);
    const balance = totalIncome - totalExpense;

    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <div style={formStyle}>
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
        </div>
    );
};

export default Summary;