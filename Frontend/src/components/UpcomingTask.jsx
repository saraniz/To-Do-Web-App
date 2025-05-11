import React from "react";
import { useSelector } from "react-redux";

const UpcomingTask = () => {
  // Get task state from Redux
  const { loading, task, error } = useSelector((state) => state.task);

  const today = new Date().toISOString().split("T")[0];


  // Check for loading or error states
  if (loading) return <div className="p-4">Loading tasks...</div>;
  // if (error) return <div className="p-4 text-red-500">Failed to load tasks: {error}</div>;

  return (
    <div className="p-4 rounded-lg shadow-lg bg-[#F3FCF0]">
      <h2 className="text-xl font-semibold font-sans mb-4">Upcoming Tasks 📅</h2>
      <ul className="space-y-3">
        {(task[0]?.tasks || [])
          .filter((t) => t.dueDate >= today) // Filter tasks that are "to do"
          .map((t) => ( // Map through the filtered tasks
            <li
              key={t._id}
              className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-100"
            >
              <span className="font-medium text-gray-800">
                {t.taskName}
              </span>
              <span className="text-sm text-gray-500">
                📅 {new Date(t.dueDate).toDateString()}
              </span>
            </li>
          ))
        }
        {task.length === 0 || task[0]?.tasks?.length === 0 ? (
          <p className="text-gray-600">No upcoming tasks.</p>
        ) : null}
      </ul>
    </div>
  );
};

export default UpcomingTask;
