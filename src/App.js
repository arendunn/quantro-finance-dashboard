import React from 'react';
import { FinanceProvider } from './context/FinanceContext';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';

const App = () => {
  return (
    <FinanceProvider>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>Quantro Finance Dashboard</h1>
        <TransactionForm/>
        <TransactionList/>
        <Summary/>
      </div>
    </FinanceProvider>
  )
}

export default App;
