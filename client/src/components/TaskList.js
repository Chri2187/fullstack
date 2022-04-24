import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const TaskList = ({ index, nomeTask, dataTask, removeTask }) => {
  return (
    <>
      <div className="shadow-lg p-3 mb-2 bg-body rounded">
        <h4>{nomeTask}</h4>
        <div className="d-flex justify-content-end">
          <p>Fine: {dataTask}</p>
          <div className="" style={{ marginLeft: "1rem" }}>
            <FaTrashAlt
              type="button"
              style={{ color: "red" }}
              onClick={removeTask}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskList;
