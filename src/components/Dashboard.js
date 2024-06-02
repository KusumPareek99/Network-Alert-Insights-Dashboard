import React from "react";
import AlertFrequencyChart from "./AlertFrequencyChart";
import TopSourceIPsChart from "./TopSourceIPsChart";
import TopDestinationPortsChart from "./TopDestinationPortsChart";
import AlertCategoriesChart from "./AlertCategoriesChart";
import AlertSeverityChart from "./AlertSeverityChart";
import "../../src/App.css";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <a href="#frequency">Alert Frequency</a>
        <a href="#source-ips">Top Source IPs</a>
        <a href="#dest-ports">Top Destination Ports</a>
        <a href="#categories">Alert Categories</a>
        <a href="#severity">Alert Severity</a>
      </div>
      <div className="main-content">
        <div className="topbar">
          <h1>Network Alert Dashboard</h1>
        </div>
        <div className="chart-container" id="frequency">
          <h2 className="chart-title">Alert Frequency Over Time</h2>
          <AlertFrequencyChart />
        </div>
        <div className="chart-container" id="source-ips">
          <h2 className="chart-title">Top Source IPs</h2>
          <TopSourceIPsChart />
        </div>
        <div className="chart-container" id="dest-ports">
          <h2 className="chart-title">Top Destination Ports</h2>
          <TopDestinationPortsChart />
        </div>

        <div className="chart-container" id="categories">
          <h2 className="chart-title">Alert Categories</h2>
          <AlertCategoriesChart />
        </div>
        <div className="chart-container" id="severity">
          <h2 className="chart-title">Alert Severity</h2>
          <AlertSeverityChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
