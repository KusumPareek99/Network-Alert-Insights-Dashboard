import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { alertsData } from "../data";

ChartJS.register(ArcElement, Tooltip, Legend);

// Function to extract unique alert severities
function getAlertSeverities(alertsData) {
  const severities = alertsData
    .filter((alert) => alert.alert && alert.alert.severity)
    .map((alert) => alert.alert.severity);

  // Remove duplicates by converting to a Set and back to an array
  const uniqueSeverities = [...new Set(severities)];
  return uniqueSeverities;
}

const alertSeverities = getAlertSeverities(alertsData);

// Function to count alerts for a given severity
function countAlerts(severity) {
  return alertsData.filter(
    (alert) => alert.alert && alert.alert.severity === severity
  ).length;
}

const alertCount = alertSeverities.map((severity) => countAlerts(severity));

const AlertSeverityChart = () => {
  const data = {
    labels: alertSeverities,
    datasets: [
      {
        label: "Alert Severity",
        data: alertCount,
        backgroundColor: ["rgba(255,99,132,1)", "rgba(255,206,86,1)"],
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

export default AlertSeverityChart;
