import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const TransactionList = () => {
    const { transactions } = useContext(FinanceContext);
    
    return (
        <div className="transaction-list">
        <h3>Transaction History</h3>
        <ul>
            {transactions.map((transaction) => (
            <li key={transaction.id}>
                {transaction.description} - ${transaction.amount}
            </li>
            ))}
        </ul>
        </div>
    );
};
export default TransactionList;
// This component displays a list of transactions.