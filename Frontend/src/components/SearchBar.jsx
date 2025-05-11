import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchTasks } from "../Storage/Task/taskAction";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  // ✅ Corrected selector (access 'task' slice)
  const { loading, error, searchtask } = useSelector((state) => state.task);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchTasks(searchInput));
    setShowModal(true);
  };

  // Handle the structure of searchtask
  const taskList =
    Array.isArray(searchtask) && searchtask.length > 0
      ? Array.isArray(searchtask[0])
        ? searchtask[0] // handle double-wrapped array
        : searchtask[0]?.tasks || []
      : [];

  return (
    <>
      {/** when we add relative to a container (like <div>) it doesn't move the element itself, but it sets a reference point for absolutely
       * positioned childrens
       *
       * absolutely positioned mean the elements placed exact place
       *
       * mx-auto: Centers the div horizontally by automatically adjusting left and right margins.
       */}
      <div>
        <form onSubmit={handleSearch}>
          <div className="relative w-[800px] mt-7 mx-auto">
            {/* Icon */}
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black pointer-events-none">
              <Search className="w-5 h-5 text-black" />
            </span>

            {/* Input */}
            <input
              type="text"
              value={searchInput}
              placeholder="Search Your Tasks ..."
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full py-2 pl-10 pr-4 bg-transparent border-2 border-black font-serif text-black placeholder-black rounded-3xl focus:outline-none"
            />
          </div>
        </form>

        {showModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className=" bg-white p-8 rounded-2xl w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300">
      
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-black">
        Search Results
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : taskList.length > 0 ? (
        <ul className="space-y-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800">
          {taskList.map((item) => (
            <li
              key={item._id}
              className="rounded-xl border border-gray-300 dark:border-black bg-white dark:bg-green-100 p-5 shadow-md hover:shadow-xl transition-transform duration-200"
            >
              <p className="text-sm text-black dark:text-black font-medium font-serif">
                <strong>Task Name:</strong> {item?.taskName || "N/A"}
              </p>
              <p className="text-sm text-black dark:text-black font-medium font-serif mt-1">
                <strong>Status:</strong> {item?.status || "N/A"}
              </p>
              <p className="text-sm text-black dark:text-black font-medium font-serif mt-1">
                <strong>Priority:</strong> {item?.priority || "N/A"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No results found.</p>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => setShowModal(false)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </>
  );
};

export default SearchBar;
