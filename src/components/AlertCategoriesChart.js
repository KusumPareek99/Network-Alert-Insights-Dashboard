import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { alertsData } from "../data";

ChartJS.register(ArcElement, Tooltip, Legend);

// Function to extract unique alert categories
function getAlertCategories(alertsData) {
  const categories = alertsData
    .filter((alert) => alert.alert && alert.alert.category)
    .map((alert) => alert.alert.category);

  // Remove duplicates by converting to a Set and back to an array
  const uniqueCategories = [...new Set(categories)];
  return uniqueCategories;
}

const alertCategories = getAlertCategories(alertsData);

// Function to count alerts for a given category
function countAlerts(category) {
  return alertsData.filter(
    (alert) => alert.alert && alert.alert.category === category
  ).length;
}

const alertCount = alertCategories.map((category) => countAlerts(category));

const AlertCategoriesChart = () => {
  const data = {
    labels: alertCategories,
    datasets: [
      {
        label: "Alert Categories",
        data: alertCount,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "rgba(54,162,235,1)",
          "rgba(255,206,86,1)",
          "rgba(255,99,132,1)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
      },
    },
  };

  return (
    <div className="pie-container">
      <Pie data={data} options={options} />
    </div>
  );
};

export default AlertCategoriesChart;
