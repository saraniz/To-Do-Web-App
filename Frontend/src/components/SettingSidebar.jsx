import React from "react";
import { Link } from "react-router-dom";
import { User, ChevronRight } from "lucide-react";

const SettingSidebar = () => {
  return (
    <aside className="flex flex-col space-y-4 min-h-screen w-[340px] bg-blue-400 p-6">
    
      <Link to="/accountsettings">
        <button className="mt-[27vh] ml-[15px]  flex justify-between items-center py-4 px-6 bg-amber-300 rounded-lg shadow-lg hover:bg-amber-400 transition duration-300">
          <div className="flex items-center gap-2">
            <User size={20} className="text-gray-700" />
            <span className="text-gray-700 font-semibold">Account Settings</span>
          </div>
          <ChevronRight size={20} className="text-gray-700" />
        </button>
      </Link>

      <Link to="/passwordmanager">
        <button className="ml-[15px] flex justify-between items-center py-4 px-6 bg-amber-300 rounded-lg shadow-lg hover:bg-amber-400 transition duration-300">
          <div className="flex items-center gap-2">
            <User size={20} className="text-gray-700" />
            <span className="text-gray-700 font-semibold">Password Manager</span>
          </div>
          <ChevronRight size={20} className="text-gray-700" />
        </button>
      </Link>

      <Link to="/logout">
        <button className="ml-[15px] flex justify-between items-center py-4 px-6 bg-amber-300 rounded-lg shadow-lg hover:bg-amber-400 transition duration-300">
          <div className="flex items-center gap-2">
            <User size={20} className="text-gray-700" />
            <span className="text-gray-700 font-semibold">Logout</span>
          </div>
          <ChevronRight size={20} className="text-gray-700" />
        </button>
      </Link>
    </aside>
  );
};

export default SettingSidebar;
