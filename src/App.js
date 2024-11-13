import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import DashboardPage from "./components/DashboardPage";
import React from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-toastify/dist/ReactToastify.min.css";
import About from "./components/About";
import Cookies from "js-cookie";

const FetchedContext = createContext();

function App() {

  const [tasks, setTasks] = useState([]);

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [descriptionData, setDescriptionData] = useState({})

  const [openUserAccount, setOpenUserAccount] = useState(false);


  const setDataToLocalStorage = (data) => {
    localStorage.setItem("tasks", JSON.stringify(data));
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      try {
        const response = await fetch(
          "https://oscowbackend-production.up.railway.app/api/todos",{
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );
        const data = await response.json();
        if(data){
        setTasks(data);
        setDataToLocalStorage(data);
        }
      } catch (error) {
        notify("Error Fetching Tasks from API!", "error")
        console.log("Error Fetching Tasks!", error);
      }
    };
    const storedTasks = JSON.parse(localStorage.getItem("tasks"))
    if (storedTasks && storedTasks.length>0) {
      setTasks(storedTasks);
    } else {
      fetchData();
    }
  }, []);


  const deleteTask = (todoId) => {
    const token = Cookies.get("token");
    fetch(`https://oscowbackend-production.up.railway.app/api/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    let updatedTask = tasks ? tasks.filter((task)=>task.todoId !== todoId) : {};
    localStorage.setItem("tasks", JSON.stringify(updatedTask));
    setTasks(JSON.parse(localStorage.getItem('tasks')))
    notify("Task Deleted SuccessFully!","success")
    isDescriptionOpen && setIsDescriptionOpen(false);
  };

    const showDescription = (id)=>{
      setIsDescriptionOpen(!isDescriptionOpen)
      const updatedDesc = tasks.find((task) => task.id === id);
      setDescriptionData(updatedDesc)
    }

    const notify = (msg,type) => {
      if(type==="success"){
        toast.success(msg);
      }else{
        toast.error(msg);
      }
    }
  return (
    <FetchedContext.Provider
      value={{
        tasks,
        setTasks,
        deleteTask,
        isDescriptionOpen, 
        setIsDescriptionOpen,
        showDescription,
        descriptionData,
        setDescriptionData,
        notify,
        openUserAccount,
        setOpenUserAccount
      }}
    >
      <div className="App">
      <ToastContainer />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about" element={<About/>}/>
          </Routes>
        </Router>
      </div>
    </FetchedContext.Provider>
  );
}

export default App;
export { FetchedContext };
