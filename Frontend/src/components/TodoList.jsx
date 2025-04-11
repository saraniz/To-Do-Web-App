import React from "react";

const TodoList = () => {
  return (
    <>
      <div className="ml-[50px] flex space-x-4 mt-8 w-[90%] mx-auto">
        {/* To Do Column */}
        <div className="flex-1 bg-blue-400 p-4 rounded-lg shadow-md">
          <h1 className="text-white font-bold text-lg mb-2 ">To Do</h1>
          <div className="mt-[2vh] w-full h-20 bg-amber-400 rounded-md"></div>
        </div>

        {/* In Progress Column */}
        <div className="flex-1 bg-blue-400 p-4 rounded-lg shadow-md">
          <h1 className="text-white font-bold text-lg mb-2">In Progress</h1>
          <div className="mt-[2vh] w-full h-20 bg-amber-400 rounded-md"></div>
        </div>

        {/* Done Column */}
        <div className="flex-1 bg-blue-400 p-4 rounded-lg shadow-md">
          <h1 className="text-white font-bold text-lg mb-2">Done</h1>
          <div className="mt-[2vh] w-full h-20 bg-amber-400 rounded-md"></div>
        </div>
      </div>
    </>
  );
};

export default TodoList;
