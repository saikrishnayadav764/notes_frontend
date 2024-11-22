import React, { useContext, useEffect } from "react";
import "./dashboardContainer.styles.css";
import PieChartComponent from "./Pie";
import { FetchedContext } from "../../../App";
import Cookies from "js-cookie";

const DashboardContainer = () => {
  const {tasks=[], setTasks, notify } = useContext(FetchedContext) || {};

 
  let completed = tasks ? tasks.filter(task => task.completed).length : 0;
  let pending = tasks ? tasks.filter(task => !task.completed).length : 0;

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      try {
        const response = await fetch("https://oscowbackend-production.up.railway.app/api/todos", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setTasks(data);  // Update context with the new tasks
      } catch (error) {
        notify("Error Fetching Notes from API!", "error");
      }
    };

    fetchData();  // Re-fetch data when the route changes

  }, []);

  return (
    <div className="dashboard-container" id="dash-container">
      <div className="dash-heading">
        <h2>Dashboard</h2>
        <p>See your overall Metrics</p>
      </div>
      <div className="status-container">
        <div className="total-tasks task-status">
            <h1>{tasks?tasks.length:0}</h1>
            <p>Total Notes</p>
        </div>
        <div className="pending-tasks task-status">
        <h1>{pending}</h1>
            <p>Pending Notes</p>
        </div>
        <div className="completed-tasks task-status">
        <h1>{completed}</h1>
            <p>Complete Notes</p>
        </div>
      </div>
      <h2 className="chart-heading">
        Performance
      </h2>
      <PieChartComponent completed={completed} pending={pending}/>
    </div>
  );
};

export default DashboardContainer;
