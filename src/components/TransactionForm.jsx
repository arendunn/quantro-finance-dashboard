import React, { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';

const TransactionForm = () => {
  const { addTransaction } = useContext(FinanceContext);
  const [transactionType, setTransactionType] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transactionType && transactionDate && description && amount) {
      addTransaction({ transactionType, transactionDate, description, amount: parseFloat(amount) });
      setTransactionType('');
      setTransactionDate('');
      setDescription('');
      setAmount('');
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3>Add Transactions:</h3>
        <div className="transaction-type">
          <h4>Select Transaction Type:</h4>
          <input
            type="radio"
            value="income"
            checked={transactionType === 'income'}
            onChange={(e) => setTransactionType(e.target.value)}
          /> Income
          <input
            type="radio"
            value="expense"
            checked={transactionType === 'expense'}
            onChange={(e) => setTransactionType(e.target.value)}
          /> Expense
        </div>
        <h4>Select Transaction Date: </h4>
          <input
            type="date"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
            required
          />
        <h4>Enter Description: </h4>
        <input
          type="text"
          placeholder="Coffee, Rent, etc."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <h4>Enter Amount: </h4>
        <span>$
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </span>
        <h3>
          <button type="submit">Add Transaction</button>
        </h3>
      </form>
    </div>
  );
}

export default TransactionForm;
// This component allows users to add a new transaction by entering a description and amount.