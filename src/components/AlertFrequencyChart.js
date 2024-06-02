import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { alertsData } from "../data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function extractRoundedTime(timestamp) {
  // Create a Date object from the timestamp
  const date = new Date(timestamp);

  // Extract hours and minutes
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // Round to the nearest minute
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  if (seconds >= 30 || (seconds === 29 && milliseconds > 0)) {
    minutes += 1;
  }

  // Handle rounding up to the next hour
  if (minutes === 60) {
    minutes = 0;
    hours += 1;
  }

  // Format hours to 12-hour format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  // Ensure two-digit minutes
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}`;
}

const timeStamp = alertsData.map((alert) =>
  extractRoundedTime(alert.timestamp)
);

// Function to count alerts for a given rounded time
function countAlertsForTime(alertsData, targetTime) {
  return alertsData.reduce((count, alert) => {
    // Extract formatted hours and minutes
    const roundedTime = extractRoundedTime(alert.timestamp);

    // Increment count if times match
    if (roundedTime === targetTime) {
      count++;
    }
    return count;
  }, 0);
}

// Create an array of alert counts for each rounded time
const alertCounts = timeStamp.map((time) =>
  countAlertsForTime(alertsData, time)
);

const AlertFrequencyChart = () => {
  const data = {
    labels: timeStamp,
    datasets: [
      {
        label: "Alerts Over Time",
        data: alertCounts,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
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

  return <Line data={data} options={options} />;
};

export default AlertFrequencyChart;
