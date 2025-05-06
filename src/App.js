import React from 'react';
import { FinanceProvider } from './context/FinanceContext';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import AssetForm from './components/AssetForm';
import AssetList from './components/AssetList';

const App = () => {
  return (
    <FinanceProvider>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h1>Quantro</h1>
          <h2>Personal Finance Dashboard</h2>
        <Summary/>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px'}}>
          <TransactionForm/>
          <TransactionList/>
          <AssetForm/>
          <AssetList/>
        </div>
      </div>
      <footer style={{ marginTop: '20px', textAlign: 'center' }}>
        <p> &copy; 2023 Quantro. All rights reserved.</p>
      </footer>
    </FinanceProvider>
  )
}

export default App;
