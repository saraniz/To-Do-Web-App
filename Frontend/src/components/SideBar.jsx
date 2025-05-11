import React from "react";
import Logo from "../assets/logo.png";
import { Home, Settings, ClipboardList, Calendar, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Storage/Auth/AuthAction";

const SideBar = () => {
  const { loading, user, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        Swal.fire("Logged out!", "You have been logged out.", "success");
        navigate("/")
      }
    });
  };

  return (
    <aside className="flex flex-col space-y-6 mt-[20vh]">
      <div className="mt-[-19vh] ml-[-25px]">
        <Link to={"/dashboard"}>
          <img className="mt-[-1vh] w-42 h-42" src={Logo} alt="Logo" />
        </Link>
      </div>

      <div className="flex flex-col space-y-6 mt-[2vh]">
        <Link to="/dashboard">
          <button className="w-50 rounded-xl border-2 flex items-center gap-2 px-3 py-2 cursor-pointer">
            <Home size={20} />
            Dashboard
          </button>
        </Link>

        <Link to="/tasks">
          <button className="w-50 rounded-xl border-2 flex items-center gap-2 px-3 py-2 cursor-pointer">
            <ClipboardList size={20} />
            Tasks
          </button>
        </Link>

        <Link to="/calendar">
          <button className="w-50 rounded-xl border-2 flex items-center gap-2 px-3 py-2 cursor-pointer">
            <Calendar size={20} />
            Calendar
          </button>
        </Link>

        <Link to="/settings">
          <button className="w-50 rounded-xl border-2 flex items-center gap-2 px-3 py-2 cursor-pointer">
            <Settings size={20} />
            Settings
          </button>
        </Link>

        <button
          onClick={handleLogOut}
          className="w-50 rounded-xl border-2 flex items-center gap-2 px-3 py-2 cursor-pointer"
        >
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
