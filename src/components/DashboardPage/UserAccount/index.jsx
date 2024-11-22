import React, { useContext, useEffect } from "react";
import "./UserAccount.styles.css";
import userImg from "../../../assets/images/userImg.png";
import { Link } from "react-router-dom";
import { FetchedContext } from "../../../App";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const UserAccount = ({tasks}) => {
  const { setTasks, notify} = useContext(FetchedContext)|| { };
  const navigate = useNavigate()

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
        notify("Error Fetching Tasks from API!", "error");
      }
    };

    fetchData();  // Re-fetch data when the route changes

  }, []);

  return (
    <div className="user-account-container">
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

      <button onClick={()=>{
        Cookies.remove('token');
        if (!Cookies.get("token")) {
        navigate("/")
        localStorage.clear();
        }
      }}  style={{border:"none", cursor:"pointer"}} className="logout" to="/">
        Logout
      </button>
    </div>
  );
};

export default UserAccount;
