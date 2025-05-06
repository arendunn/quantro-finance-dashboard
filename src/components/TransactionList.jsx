import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const TransactionList = () => {
    const { transactions } = useContext(FinanceContext);
    
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '300px',
      };

    const grouped = transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.transactionDate).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
    }, {});

    const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <div style={formStyle}>
                <span style={{ width: '100%', textAlign: 'center'}}>
                    <h2>Transaction List</h2>
                </span>
                {sortedDates.map(date => (
                    <div key={date}>
                    <h3 style={{paddingRight: '20vh'}}>{date}</h3>
                    <ul>
                        {grouped[date].map(tx => (
                        <li key={tx.id} style={{ width: '100%', display: 'flex', justifyContent:'space-between', listStyleType: 'none' }}>
                            <span>{tx.description}</span>
                            <span>
                                {tx.transactionType === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                            </span>
                        </li>
                        ))}
                    </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default TransactionList;
// This component displays a list of transactions.