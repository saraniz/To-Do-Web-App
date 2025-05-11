import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../Storage/Task/taskAction";
import Loader from "./Loader";

const TodoList = () => {
  const { loading, task, error } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const [showAllToDo, setShowAllToDo] = useState(false);
  const [showAllInProgress, setShowAllInProgress] = useState(false);
  const [showAllDone, setShowAllDone] = useState(false);

  useEffect(() => {

      dispatch(fetchTasks());
    

  }, [dispatch]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const allTasks = task[0]?.tasks || [];

  const toDoTasks = allTasks.filter((t) => {
    const taskDate = new Date(t.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate > today;
  });

  const inProgressTasks = allTasks.filter((t) => {
    const taskDate = new Date(t.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === today.getTime();
  });

  const doneTasks = allTasks.filter((t) => {
    const taskDate = new Date(t.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate < today;
  });

  const renderTaskList = (tasks, showAll, toggleShowAll) => {
    const visibleTasks = showAll ? tasks : tasks.slice(0, 6);

 

    return (
      <>
        {visibleTasks.map((taskItem) => (
          <div key={taskItem._id} className="relevant flex justify-between items-center mt-4 p-3 bg-transparent rounded-md border-2 border-black">
            <h2 className="font-semibold font-sans text-1xl">{taskItem.taskName}</h2>
            <span
              className={`absolute ml-55 text-xs font-medium px-3 py-1 rounded-full border 
                ${taskItem.priority === "high" ? "bg-red-100 text-red-700 border-red-300" : ""}
                ${taskItem.priority === "medium" ? "bg-yellow-100 text-yellow-700 border-yellow-300" : ""}
                ${taskItem.priority === "low" ? "bg-green-100 text-green-700 border-green-300" : ""}
                shadow-sm`}
            >
              {taskItem.priority}
            </span>
          </div>
        ))}
        {tasks.length > 6 && (
          <button
            onClick={toggleShowAll}
            className="mt-3 ml-28 px-3 py-1 text-sm text-white bg-black rounded hover:bg-gray-800"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        )}
        {tasks.length === 0 && <p className="text-white font-serif">No tasks</p>}
      </>
    );
  };

  return (
    <div className="ml-[50px] flex space-x-4 mt-8 w-[90%] mx-auto">
      {/* To Do Column */}
      <div className="flex-1 bg-[#A5D6A7] p-4 rounded-lg shadow-md">
        <h1 className="text-white font-bold font-serif text-lg mb-2">To Do</h1>
        {renderTaskList(toDoTasks, showAllToDo, () => setShowAllToDo(!showAllToDo))}
      </div>

      {/* In Progress Column */}
      <div className="flex-1 bg-[#B39DDB] p-4 rounded-lg shadow-md">
        <h1 className="text-white font-bold font-serif text-lg mb-2">In Progress</h1>
        {renderTaskList(inProgressTasks, showAllInProgress, () => setShowAllInProgress(!showAllInProgress))}
      </div>

      {/* Done Column */}
      <div className="flex-1 bg-[#FF9AA2] p-4 rounded-lg shadow-md">
        <h1 className="text-white font-bold font-serif text-lg mb-2">Done</h1>
        {renderTaskList(doneTasks, showAllDone, () => setShowAllDone(!showAllDone))}
      </div>
    </div>
  );
};

export default TodoList;
