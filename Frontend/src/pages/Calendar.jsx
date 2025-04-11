import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import SideBar from "../components/SideBar";

const CalendarView = () => {
  const events = [
    { title: "Meeting", start: "2024-03-26" },
    { title: "Project Deadline", start: "2024-03-30" },
  ];

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
        <div className="flex w-[1100px] ml-[60px] mx-auto p-4 mt-[8vh] rounded-3xl bg-white shadow-lg overflow-hidden">
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

export default CalendarView;
