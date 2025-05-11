import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { Plus, List, Trash2 } from "lucide-react";
import TodoList from "../components/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { addTasks, deleteTasks, fetchTasks } from "../Storage/Task/taskAction";
import SearchBar from "../components/SearchBar";
import Loader from '../components/Loader'

const TasksPage = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [status, setStatus] = useState("to do");
  const [dueDate, setDueDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [color, setColor] = useState("");
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [showViewInput, setShowViewInput] = useState(false);
  const [pageLoading, setPageLoading] = useState(true)
  

  const dispatch = useDispatch();
  const { loading, task, error } = useSelector((state) => state.task);


  useEffect(() => {

    const timer = setTimeout(() =>{
      if (showViewInput) {
      dispatch(fetchTasks());

      }
      setPageLoading(false)
    },500)
    
  }, [showViewInput, dispatch]);

  const handleCloseModal = () => {
    setShowTaskInput(false);
    setShowViewInput(false);
    setTaskName("");
    setTaskDescription("");
    setPriority("low");
    setStatus("to do");
    setDueDate("");
    setEndDate("");
    setColor("");
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!taskName.trim() || !taskDescription.trim() || !priority || !status) {
      alert("Please fill out all required fields!");
      return;
    }
    if (dueDate && endDate && new Date(dueDate) > new Date(endDate)) {
      alert("Due date must be before end date!");
      return;
    }

    const newTask = {
      taskName,
      taskDescription,
      priority,
      status,
      dueDate: dueDate || undefined,
      endDate: endDate || undefined,
      color: color || "",
    };

    dispatch(addTasks(newTask));
    handleCloseModal();

    window.location.reload()
  };

  const handleTaskDelete = (taskId) => {
    dispatch(deleteTasks(taskId));
    
   window.location.reload()
    
  };

  if(pageLoading){
    return <Loader />
  }

 
  return (
    <div className="min-h-screen flex bg-[#F3FCF0]">
      {/* Sidebar */}
      <div className="bg-[#0A3A10] w-63">
        <div className="ml-[25px]">
          <SideBar />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Search */}
        <SearchBar />

        {/* Buttons */}
        <div className="mt-10 flex gap-4">
          <button
            onClick={() => setShowTaskInput(true)}
            className="ml-13 w-10 h-10 border-2 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
          >
            <Plus size={18} />
          </button>
          <button
            onClick={() => setShowViewInput(true)}
            className="w-10 h-10 border-2 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
          >
            <List size={18} />
          </button>
        </div>

        {/* Add Task Modal */}
        {showTaskInput && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white p-6 w-full max-w-xl rounded-xl shadow-lg">
              <form onSubmit={handleSave}>
                <h2 className="text-2xl font-bold mb-4 font-serif">
                  Add New Task
                </h2>

                <input
                  type="text"
                  placeholder="Task Name"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Task Description"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  className="w-full mb-3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Priority
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full h-[44px] px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full h-[44px] px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="to do">To Do</option>
                      <option value="in progress">In Progress</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">Color</label>
                  <input
                    type="color"
                    value={color || "#000000"}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-16 h-10 border border-gray-300 rounded"
                  />
                </div> */}

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <div className="flex justify-end mt-6 gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    disabled={loading}
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Task Modal */}
        {showViewInput && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
              <h2 className="text-3xl font-serif font-bold mb-6 text-gray-800">
                View Tasks
              </h2>

              <div className="max-h-[500px] overflow-y-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-semibold text-gray-600">Task Name</th>
                      <th className="text-left p-4 font-semibold text-gray-600">Description</th>
                      <th className="text-left p-4 font-semibold text-gray-600">Priority</th>
                      <th className="text-left p-4 font-semibold text-gray-600">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-600">Due Date</th>
                      <th className="text-left p-4 font-semibold text-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(task[0]?.tasks || []).map((taskItem, index) => (
                      <tr
                        key={taskItem._id || index}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-all"
                      >
                        <td className="p-4 font-medium text-gray-800">{taskItem.taskName}</td>
                        <td className="p-4 text-gray-600">{taskItem.taskDescription}</td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                              ${
                                taskItem.priority === "high"
                                  ? "bg-red-100 text-red-700 border border-red-300"
                                  : taskItem.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                                  : "bg-green-100 text-green-700 border border-green-300"
                              }`}
                          >
                            {taskItem.priority.charAt(0).toUpperCase() + taskItem.priority.slice(1)}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">
                          {taskItem.status.charAt(0).toUpperCase() + taskItem.status.slice(1)}
                        </td>
                        <td className="p-4 text-gray-600">{taskItem.dueDate || "N/A"}</td>
                        <td className="p-4">
                          <button
                            onClick={() => handleTaskDelete(taskItem._id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="mt-8">
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TasksPage;