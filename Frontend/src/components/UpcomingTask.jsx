import React from "react";

const UpcomingTask = ({ tasks }) => {
  return (
    <div className=" p-4 rounded-lg shadow-md ">
      <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
      <ul className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-100">
              <span>{task.name}</span>
              <span className="text-sm text-gray-500">{task.dueDate}</span>
            </li>
          ))
        ) : (
          <p>No upcoming tasks.</p>
        )}
      </ul>
    </div>
  );
};

export default UpcomingTask;
