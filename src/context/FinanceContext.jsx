import React, { createContext, useState, useEffect } from 'react';

// Create a context for finance data
export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [assets, setAssets] = useState([]);

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

    // Fetch assets from localStorage on initial render
    useEffect(() => {
        const storedAssets = JSON.parse(localStorage.getItem('assets')) || [];
        setAssets(storedAssets);
    }, []);

    // Save assets to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('assets', JSON.stringify(assets));
    }, [assets]);

    // Add assets function
    const addAssets = (assets) => {
        setAssets((prevAssets) => [...prevAssets, assets]);
    };

    // Remove assets function
    const removeAssets = (id) => {
        setAssets((prevAssets) => prevAssets.filter(asset => asset.id !== id));
    };

    return (
        <FinanceContext.Provider value={{ transactions, addTransaction, removeTransaction, assets, addAssets, removeAssets }}>
            {children}
        </FinanceContext.Provider>
    );
};