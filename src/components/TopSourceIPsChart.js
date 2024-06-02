import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { alertsData } from "../data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// extract unique source IPs from alerts data
const sourceIPs = [...new Set(alertsData.map((alert) => alert.src_ip))];

// Function to count alerts for a given source IP
function countAlerts(sourceIP) {
  return alertsData.filter((alert) => alert.src_ip === sourceIP).length;
}
const alertCount = sourceIPs.map((sourceIP) => countAlerts(sourceIP));

const TopSourceIPsChart = () => {
  const data = {
    labels: sourceIPs.slice(0, 10),
    datasets: [
      {
        label: "Top Source IPs",
        data: alertCount.slice(0, 10),
        backgroundColor: "rgba(75,192,192,1)",
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
    scales: {
      x: {
        grid: {
          color: "#444444",
        },
        ticks: {
          color: "#ffffff",
        },
      },
      y: {
        grid: {
          color: "#444444",
        },
        ticks: {
          color: "#ffffff",
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default TopSourceIPsChart;
