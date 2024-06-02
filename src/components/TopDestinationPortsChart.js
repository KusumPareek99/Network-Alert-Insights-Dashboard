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

// extract unique destination ports from alerts data
const destinationPorts = [
  ...new Set(alertsData.map((alert) => alert.dest_port)),
];

// Function to count alerts for a given destination port
function countAlerts(port) {
  return alertsData.filter((alert) => alert.dest_port === port).length;
}
const alertCount = destinationPorts.map((port) => countAlerts(port));

const TopDestinationPortsChart = () => {
  const data = {
    labels: destinationPorts.slice(0, 8),
    datasets: [
      {
        label: "Top Destination Ports",
        data: alertCount.slice(0, 8),
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

export default TopDestinationPortsChart;
