import React, { useContext, useEffect, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const SummaryChart = () => {
  const { transactions } = useContext(FinanceContext);
  const [chartData, setChartData] = useState({
    labels: [],  // X-axis labels (dates)
    datasets: [
      {
        label: "Income",
        data: [],  // Income values
        borderColor: "green",
        backgroundColor: "green",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Expense",
        data: [],  // Expense values
        borderColor: "red",
        backgroundColor: "red",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Balance",
        data: [],  // Balance values
        borderColor: "blue",
        backgroundColor: "blue",
        fill: false,
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    // Function to update the chart data
    const updateChartData = () => {
      const incomeData = [];
      const expenseData = [];
      const balanceData = [];
      const dates = [];

      let totalIncome = 0;
      let totalExpense = 0;

      // Loop through transactions and accumulate data by date
      transactions.forEach((transaction) => {
        const date = new Date(transaction.transactionDate).toLocaleDateString();
        
        // Push the date to the labels array if it's not already added
        if (!dates.includes(date)) {
          dates.push(date);
        }

        // Accumulate totals for income, expense, and balance
        if (transaction.transactionType === "income") {
          totalIncome += transaction.amount;
        } else if (transaction.transactionType === "expense") {
          totalExpense += transaction.amount;
        }

        incomeData.push(totalIncome);
        expenseData.push(totalExpense);
        balanceData.push(totalIncome - totalExpense);
      });

      // Update the chart data state
      setChartData({
        labels: dates,
        datasets: [
          {
            label: "Income",
            data: incomeData,
            borderColor: "green",
            backgroundColor: "green",
            fill: false,
            tension: 0.1,
          },
          {
            label: "Expense",
            data: expenseData,
            borderColor: "red",
            backgroundColor: "red",
            fill: false,
            tension: 0.1,
          },
          {
            label: "Balance",
            data: balanceData,
            borderColor: "blue",
            backgroundColor: "blue",
            fill: false,
            tension: 0.1,
          },
        ],
      });
    };

    updateChartData();
  }, [transactions]); // Re-run when transactions change
  
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <div style={{ width: "80%", padding: "20px" }}>
        <h2>Financial Summary Chart</h2>
        <Line data={chartData} options={{ responsive: true, scales: { x: { title: { display: true, text: "Date" } }, y: { title: { display: true, text: "Amount ($)" } } } }} />
      </div>
    </div>
  );
};

export default SummaryChart;
