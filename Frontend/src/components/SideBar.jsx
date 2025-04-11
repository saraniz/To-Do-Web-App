import React from "react";
import Logo from "../assets/logo.png";
import { Home, Settings, ClipboardList, Calendar } from "lucide-react";
import {Link} from 'react-router-dom'

const SideBar = () => {
  return (
    <>
      <aside className="flex flex-col space-y-6 mt-[20vh]">
        <div className="mt-[-19vh] ml-[-25px]">
          <img className="mt-[-1vh] w-42 h-42" src={Logo} />
        </div>
        <div className="flex flex-col space-y-6 mt-[2vh]">

          <Link to="/dashboard">
            <button className="py-2 w-50 rounded-xl border-2 flex items-center gap-2 py-2 px-3 cursor-pointer">
              <Home size={20} /> Dashboard
            </button>
          </Link>

         <Link to="/tasks">
          <button className="py-2 w-50 rounded-xl border-2 flex items-center gap-2 py-2 px-3  cursor-pointer">
            <ClipboardList size={20} />
            Tasks
          </button>
          </Link>

          <Link to="/calendar">
          <button className="py-2 w-50 rounded-xl border-2 flex items-center gap-2 py-2 px-3 cursor-pointer  ">
            <Calendar size={20} />
            Calendar
          </button>
          </Link>

          <Link to="/settings">
          <button className="py-2 w-50 rounded-xl border-2 flex items-center gap-2 py-2 px-3 cursor-pointer">
            <Settings size={20} />
            Settings
          </button>
          </Link>
          
        </div>
      </aside>
    </>
  );
};

export default SideBar;
