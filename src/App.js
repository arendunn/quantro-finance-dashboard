import React from 'react';
import { FinanceProvider } from './context/FinanceContext';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';

const App = () => {
  return (
    <FinanceProvider>
      <div>
        <h1>QUANTRO</h1>
        <TransactionForm/>
        <TransactionList/>
        <Summary/>
      </div>
    </FinanceProvider>
  )
}

export default App;
