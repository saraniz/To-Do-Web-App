import React, { useState, useEffect } from "react";
import dimage from "../assets/dimage.jpeg";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import UpcomingTask from "../components/UpcomingTask";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { searchTasks } from "../Storage/Task/taskAction";
import SearchBar from "../components/SearchBar";
import { fetchUserDetails, uploadCoverImage } from "../Storage/Auth/AuthAction";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [pageLoading, setPageLoading] = useState(true)

  const { loading, error, user } = useSelector((state) => state.user);
  const { task } = useSelector((state) => state.task);

  function arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  const dispatch = useDispatch();

  useEffect(() => {

    const timer = setTimeout(() => {
      dispatch(fetchUserDetails());
      setPageLoading(false)
    },1200)

    return () => clearTimeout(timer)
  }, [dispatch]);

  useEffect(() => {
    if (user?.coverImage) {
      setPreviewUrl(user.coverImage);
    } else {
      setPreviewUrl(dimage);
    }
  }, [user]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setUploadImage(file);
      dispatch(uploadCoverImage(file));
      window.location.reload()
    }
  };

  useEffect(() => {
    if (user) {
      if (user.coverImage && user.coverImage.data) {
        const base64String = arrayBufferToBase64(user.coverImage.data.data);
        setPreviewUrl(`data:${user.coverImage.contentType};base64,${base64String}`);
      }
    }
  }, [user]);

  const taskEvents = (task[0]?.tasks || [])
    .filter((t) => t.dueDate)
    .map((t) => ({
      title: t.taskName,
      start: t.dueDate,
      color: "#10B981", // Tailwind emerald-500
    }));

    if(pageLoading){
      return <Loader />
    }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="bg-[#0A3A10] w-180">
        <div className="ml-[25px]">
          <SideBar />
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#F3FCF0] flex-1 relative">
        {/* Search Bar */}
        <div>
          <SearchBar />
        </div>

        {/* Greeting and Image Section */}
        <div className="relative">
          <div className="gap-5 flex justify-between mt-[4vh] mx-[50px]">
            <div className="bg-[#F3FCF0] border-2 border-black w-[840px] h-60 rounded-4xl relative">
              <h1 className="p-5 ml-5 text-5xl font-bold font-sanf text-[#2E2E2E]">
                Have a Good Day {user ? user.fName : "User"}!
              </h1>
              <h2 className="absolute bg-[#F3FCF0] text-[#1C1C1C] font-serif text-1xl  w-[670px] h-28 ml-7 mt-1 rounded-2xl p-4">
                {user ? user.userQuote : "Hey"}
              </h2>
            </div>

            {/* Uploadable Image */}
            <div className="relative group w-fit">
              <img
                src={previewUrl || "/path/to/default/image.jpg"}
                alt="Dashboard"
                className="h-60 w-107 ml-5 rounded-3xl object-cover"
              />
              <input
                type="file"
                accept="image/*"
                id="fileUpload"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="fileUpload"
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <div className="bg-[#E1EACD] p-2 rounded-full shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                    />
                  </svg>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Calendar and Upcoming Tasks Container */}
        <div className="flex mx-[50px] mt-8 gap-8">
          {/* 🎨 Modern Calendar Section */}
          <div className="w-[720px] p-6 rounded-3xl bg-white shadow-2xl border border-gray-200">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={taskEvents}
              height="auto"
              eventColor="#10B981"
              eventTextColor="#ffffff"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              dayHeaderClassNames="bg-gray-100 text-md font-medium text-gray-600 py-2"
              dayCellClassNames="hover:bg-gray-50 transition duration-200 ease-in-out"
              buttonText={{
                today: "Today",
                month: "Month",
                week: "Week",
                day: "Day",
              }}
              buttonIcons={{
                prev: "chevron-left",
                next: "chevron-right",
              }}
              dayMaxEvents={true}
              firstDay={1}
              slotMinTime="08:00:00"
              slotMaxTime="20:00:00"
            />
          </div>

          {/* Upcoming Tasks Section */}
          <div className="w-90 ml-5">
            <UpcomingTask tasks={events} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
