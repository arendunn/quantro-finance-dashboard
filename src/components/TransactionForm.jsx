import React, { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';
import { v4 as uuidv4 } from 'uuid';

const TransactionForm = () => {
  const { addTransaction } = useContext(FinanceContext);
  const [transactionType, setTransactionType] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transactionType && transactionDate && description && amount) {
      addTransaction({
        id: uuidv4(),
        transactionType,
        transactionDate,
        description,
        amount: parseFloat(amount)
      });
      setTransactionType('');
      setTransactionDate('');
      setDescription('');
      setAmount('');
    }
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '500px',
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2>Add Transactions</h2>
        <div className="transaction-type">
          <h3>Select Transaction Type:</h3>
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
        <h3>Select Transaction Date: </h3>
          <input
            type="date"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
            required
          />
        <h3>Enter Description: </h3>
        <input
          type="text"
          placeholder="Coffee, Rent, etc."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <h3>Enter Amount: </h3>
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