import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../Storage/Task/taskAction";
import Loader from "../components/Loader";

const CalendarView = () => {
  const dispatch = useDispatch();
  const { loading, task, error } = useSelector((state) => state.task);
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {

    const timer = setTimeout(() => {
      dispatch(fetchTasks());
      setPageLoading(false)
    },1000)

    return () => clearTimeout(timer)
    
  }, [dispatch]);

  // Safely map your task data into FullCalendar-compatible event objects
  const taskEvents = (task[0]?.tasks || [])
    .filter((t) => t.dueDate)
    .map((t) => ({
      title: t.taskName,
      start: t.dueDate,
      color: "#EF4444", // Tailwind red-500
    }));

    if(pageLoading){
      return <Loader />
    }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="bg-[#0A3A10] w-165">
        <div className="ml-[25px]">
          <SideBar />
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#F3FCF0] w-820">
        <div className="flex w-[1100px] ml-[60px] mx-auto p-4 mt-[8vh] rounded-3xl bg-white shadow-lg overflow-hidden">
          <div className="overflow-hidden rounded-xl shadow-md w-full">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={taskEvents} // ✅ dynamically generated from task data
              height="auto"
              eventColor="red"
              eventTextColor="#fff"
              eventBorderColor="#38B2AC"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              buttonText={{
                today: "Today",
                month: "Month",
                week: "Week",
                day: "Day",
              }}
              weekends={true}
              firstDay={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
