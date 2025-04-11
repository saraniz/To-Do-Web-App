import React, { useState, useEffect } from "react";
import dimage from "../assets/dimage.jpeg";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import UpcomingTask from "../components/UpcomingTask";
import SideBar from "../components/SideBar";

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  // Fetch tasks (or use dummy tasks)
  useEffect(() => {
    setEvents([
      { id: "1", title: "Meeting", start: "2025-03-26" },
      { id: "2", title: "Project Deadline", start: "2025-03-28" },
    ]);
  }, []);

  return (
    <>
      <div className="min-h-screen flex">
        <div className=" bg-[#0A3A10] w-180">
           <div className="ml-[25px] ">
           <SideBar />
            </div> 
        </div>
        <div className=" bg-[#F3FCF0] w-820">
          <div className="">
            <input
              type="text"
              placeholder="Searh"
              class="w-290 py-2 bg-blue-400 mt-7 ml-[50px] rounded-3xl  "
            />
          </div>

          <div className="mt-[4vh] ml-[50px] bg-blue-300 w-180 h-60 rounded-4xl">
            <h1 className="p-5 ml-5 text-5xl font-bold font-sans">
              Have a Good Day Amie!
            </h1>
            <h4 className="bg-red-400 w-85 h-20 ml-11 rounded-2xl p-2">
              Add Your Quote
            </h4>
          </div>

          <div className="">
            <img
              className="h-60 w-107 mt-[-33vh] ml-[780px] rounded-3xl"
              src={dimage}
              alt="Dashboard"
            />
          </div>

          <div className="ml-[780px] mt-[5vh]">
        
              <UpcomingTask tasks={events}/>
            
          </div>


          {/* Calendar Section */}
          <div className="flex w-[720px] ml-[50px] mx-auto p-4 mt-[-24vh] rounded-3xl bg-white shadow-lg overflow-hidden">
            {/* Calendar Title */}
            {/* <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">
              📅 To-Do Calendar
            </h2> */}

            {/* FullCalendar Component */}
            <div className="overflow-hidden rounded-xl shadow-md">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                height="auto" // Prevents internal scrolling
                eventColor="red" // Modern color for events
                eventTextColor="#fff" // White text on events
                eventBorderColor="#38B2AC" // Matching border color for events
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                dayHeaderClassNames="text-lg font-semibold text-gray-700"
                buttonText={{
                  today: "Today",
                  month: "Month",
                  week: "Week",
                  day: "Day",
                }}
                weekends={true}
                firstDay={1} // Start week on Monday
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
