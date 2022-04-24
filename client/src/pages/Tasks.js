import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TaskList from "../components/TaskList";
import { FaTrashAlt } from "react-icons/fa";

const Tasks = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("LStask")) {
      const LSListTask = JSON.parse(localStorage.getItem("LStask"));
      setTaskList(LSListTask);
    }
  }, []);

  const handleTask = (e) => {
    e.preventDefault();
    if (!taskName) {
      Swal.fire("Inserire Task e data", "", "warning");
      return;
    }
    setTaskList([...taskList, { task: taskName, date: taskDate }]);
    addToLS(taskList);
    setTaskName("");
  };

  const addToLS = (task) => {
    localStorage.setItem(
      "LStask",
      JSON.stringify([...taskList, { task: taskName, date: taskDate }])
    );
  };

  const removeTask = (index) => {
    console.log(index);
    console.log(taskList.pop(taskList[index]));
    setTaskList(taskList.filter((val) => val.index !== index));
    // setTaskList([...taskList, { task: taskName, date: taskDate }]);
  };

  const removeAll = () => {
    setTaskList([]);
    localStorage.removeItem("LStask");
  };
  return (
    <>
      <div className="text-center my-5">
        <h1>Tasks List App</h1>
      </div>
      <div className="container d-flex">
        <div className="container">
          {taskList.map((task, index) => {
            return (
              <TaskList
                key={index}
                nomeTask={task.task}
                dataTask={task.date}
                removeTask={() => removeTask(index)}
              />
            );
          })}
        </div>
        <div className="task-form shadow-lg p-3 mb-5 bg-body rounded">
          <form className=" text-center " onSubmit={handleTask}>
            <div className="mb-3 ">
              <label className="form-label">Task</label>
              <input
                type="text"
                className="form-control "
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Giorno Fine</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => setTaskDate(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 ">
              <button className="btn btn-outline-primary" type="reset">
                Aggiungi
              </button>
              <button
                className="btn btn-outline-secondary"
                type="reset"
                onClick={removeAll}
              >
                Svuota lista
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Tasks;
