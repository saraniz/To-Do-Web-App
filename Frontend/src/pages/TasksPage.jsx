import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Plus, List } from "lucide-react";
import TodoList from "../components/TodoList";

const TasksPage = () => {
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("")
  // Separate state for each button
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [showViewInput, setShowViewInput] = useState(false);

  const handleCloseModal = () => {
    setShowTaskInput(false);
    setShowViewInput(false);
  };

  return (
    <>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <div className="bg-[#0A3A10] w-180">
          <div className="ml-[25px]">
            <SideBar />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-[#F3FCF0] w-820">
          {/* Search Input */}
          <div>
            <input
              type="text"
              placeholder="Search"
              className="w-180 py-2 bg-blue-400 mt-7 ml-[50px] rounded-3xl"
            />
          </div>

          {/* Buttons with Hover Effects */}
          <div className="mt-[6vh] flex space-x-5 ml-[50px]">
            {/* Add Task Button */}
            <div
              className="relative"
              // onMouseEnter={() => setShowTaskInput(true)}
              // onMouseLeave={() => setShowTaskInput(false)}
            >
              <button
                onClick={() => setShowTaskInput(true)}
                className="w-10 h-10 py-2 border-2 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
              >
                <Plus size={15} />
              </button>
            </div>

            {/* View Task Button */}
            <div
              className="relative"
              onMouseEnter={() => setShowViewInput(true)}
              onMouseLeave={() => setShowViewInput(false)}
            >
              <button
                onClick={() => setShowViewInput(true)} // Open modal on click
                className="w-10 h-10 py-2 border-2 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-all"
              >
                <List size={15} />
              </button>
            </div>

            {/* {showTaskInput && (
                <div className="z-20 absolute bottom-full  left-10 mb-[-30px] px-3 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md w-48 text-center">
                  Add a new task
                </div>
              )}
              <button className="w-10 h-10 py-2 border-2 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
                <Plus size={15} />
              </button>
            </div> */}

            {/* View Task Button */}
            {/* <div
              className="relative"
              onMouseEnter={() => setShowViewInput(true)}
              onMouseLeave={() => setShowViewInput(false)}
            >
              {showViewInput && (
                <div className="z-20 absolute bottom-full  left-10 mb-[-30px] px-3 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md w-48 text-center">
                  View task
                </div>
              )}
              <button className="w-10 h-10 py-2 border-2 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-all">
                <List size={15} />
              </button>
            </div>
          </div> */}

            {/* Modal for Add Task */}
            {showTaskInput && (
              <div className="fixed inset-50 flex items-center justify-center bg-transparent bg-opacity-50 z-50">
                <div className="bg-white p-6 w-140 h-140 rounded-lg shadow-lg ">
                  <form>
                    <input
                      type="text"
                      placeholder="New Task"
                      className="text-4xl border-none outline-none focus:ring-0"
                    />
                    <input
                      type="text"
                      placeholder="Enter task details here ..."
                      className="text-1xl border-none outline-none focus:ring-0 mt-5"
                    />
                    <div className="flex items-center space-x-10">
                      <label className="mt-5 text-xl font-normal">
                        Priority
                      </label>
                      <select
                        value={priority}
                        className="p-1 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6 ml-15"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-10">
                      <label className="mt-5 text-xl font-normal">
                        Status
                      </label>
                      <select value={status} className="p-1 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6 ml-15">
                        <option value="not started">Not Started</option>
                        <option value="in progress">In Progress</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-10">
                      <label className="mt-5 text-xl font-normal">
                        Due Date
                      </label>
                      <input type="date" value={dueDate} className="p-2 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>


                  </form>

                  <button
                    onClick={handleCloseModal} // Close the modal
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* Modal for View Task */}
            {showViewInput && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-lg font-semibold">View Tasks</h2>
                  <p className="mt-2 text-gray-600">View your tasks here...</p>
                  <button
                    onClick={handleCloseModal} // Close the modal
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative flex items-center">
            <div className="flex items-center justify-center w-[40px] h-[40px] rounded-full bg-red-500 mt-[-29vh] ml-[1000px]"></div>
            <h2 className="ml-4 mt-[-29vh]">Your Name</h2>
          </div>

          <div>
            <TodoList />
          </div>
        </div>
      </div>
    </>
  );
};

export default TasksPage;
