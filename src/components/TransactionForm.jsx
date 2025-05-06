import React, { useContext, useState } from 'react';
import { FinanceContext } from '../context/FinanceContext';

const TransactionForm = () => {
  const { addTransaction } = useContext(FinanceContext);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && amount) {
      addTransaction({ description, amount: parseFloat(amount) });
      setDescription('');
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;
// This component allows users to add a new transaction by entering a description and amount.