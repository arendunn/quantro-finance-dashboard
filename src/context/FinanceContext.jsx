import React, { createContext, useState, useEffect } from 'react';

// Create a context for finance data
export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);

    // Fetch transactions from loalStorage on initial render
    useEffect(() => {
        const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        setTransactions(storedTransactions);
    } , []);

    // Save transactions to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    // Add transaction function
    const addTransaction = (transaction) => {
        setTransactions((prevTransactions) => [...prevTransactions, transaction]);
    };

    // Remove transaction function
    const removeTransaction = (id) => {
        setTransactions((prevTransactions) => prevTransactions.filter(transaction => transaction.id !== id));
    };

    return (
        <FinanceContext.Provider value={{ transactions, addTransaction, removeTransaction }}>
            {children}
        </FinanceContext.Provider>
    );
};