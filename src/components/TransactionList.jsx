import React, { useState, useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const TransactionList = () => {
    const { transactions } = useContext(FinanceContext);
    const { removeTransaction } = useContext(FinanceContext);
    const [selected, setSelected] = useState([]);

    const toggleSelect = (id) => {
        setSelected((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter((item) => item !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    }

    const deleteSelected = () => {
        selected.forEach((id) => {
            removeTransaction(id);
        });
        setSelected([]);
    }
    
    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: '35vh',
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
                    {sortedDates.map(date => (
                        <div key={date}>
                            <h3 style={{paddingRight: '50vh'}}>{date}</h3>
                            <ul>
                                {grouped[date].map(tx => (
                                    <li key={tx.id} style={{ width: '100%', display: 'flex', justifyContent:'space-between', listStyleType: 'none' }}>
                                        <span>
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(tx.id)}
                                                onChange={() => toggleSelect(tx.id)}
                                            />
                                            {tx.description}
                                        </span>
                                        <span>
                                            {tx.transactionType === 'income'
                                            ? `+ $${tx.amount.toFixed(2)}`
                                            : `- $${tx.amount.toFixed(2)}`
                                            }
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div style={{ width: '100%', display: 'flex', justifyContent:'end'}}>
                                <h4>
                                    {(() => {
                                    const total = grouped[date]
                                        .reduce((acc, tx) => tx.transactionType === 'income' ? acc + tx.amount : acc - tx.amount, 0);
                                    return `${total < 0 ? '- $' : '$'}${Math.abs(total).toFixed(2)}`;
                                    })()}
                                </h4>
                            </div>
                        </div>
                    ))}
                    {transactions.length === 0 && (
                        <p>No transactions available.</p>
                    )}
                    {transactions.length > 0 && (
                        <button onClick={deleteSelected}>
                            Delete Selected
                        </button>
                    )}
                </span>
            </div>
        </div>
    );
};
export default TransactionList;
// This component displays a list of transactions.