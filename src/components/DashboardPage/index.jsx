import React, { useState, createContext, useContext, useEffect, useLayoutEffect } from "react";
import "./DashboardPage.styles.css";
import DashNav from "./DashNav";
import DashboardContainer from "./DashboardContainer";
import TasksContainer from "./TasksContainer";
import UserAccount from "./UserAccount";
import { FetchedContext } from "../../App";
import userImg from "../../assets/images/userImg.png";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const DashContext = createContext();

const DashboardPage = () => {
  // const [page, setPage] = useState(<DashboardContainer/>)
  const [isDash, setIsDash] = useState(true);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(null);
  const { openUserAccount, setOpenUserAccount, notify } =
    useContext(FetchedContext);

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
        // notify("Error Fetching Tasks from API!", "error");
      }
    };

    fetchData();  // Re-fetch data when the route changes

  }, []);

  return (
    <>
      <DashContext.Provider value={{ isDash, setIsDash }}>
        <div className="dashboard-page">
          <DashNav />

          <div className="dash-container-content">
            {isDash && tasks && <DashboardContainer tasks={tasks}/>}
            {!isDash && tasks &&  <TasksContainer />}
            {/* {isDash ? <DashboardContainer tasks={tasks}/> : <TasksContainer />} */}
            { tasks &&  <UserAccount tasks={tasks}/>}
          </div>
        </div>
      </DashContext.Provider>

      {openUserAccount && (
        <div
          className="user-box-background"
          onClick={() => {
            setOpenUserAccount(!openUserAccount);
          }}
        >
          <div className="user-account-container" id="user-account">
            <div className="user-image">
              <img src={userImg} alt="" />
            </div>
            <div className="user-profile-name">Hi, User</div>
            <div className="notification-container">
              <div className="notification-heading">Notifications</div>
              <div className="notification-box">
                {tasks
                  .filter((task) => task.alert === true)
                  .map((task, index) => {
                    return (
                      <div className="notifications" key={index}>
                        <h5>{task.title}</h5>
                        <p>
                          {task.date}, {task.time}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>

            <button onClick={() => {
              Cookies.remove('token');
              if (!Cookies.get("token")) {
                navigate("/")
                localStorage.clear();
              }
            }} style={{ border: "none", cursor: "pointer" }} className="logout" to="/">
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export { DashContext };
export default DashboardPage;
