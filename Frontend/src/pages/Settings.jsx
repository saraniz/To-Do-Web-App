import React from "react";
import SideBar from "../components/SideBar";
import SettingSidebar from "../components/SettingSidebar";

const Setting = () => {
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
          <div>
            <h1 className="mt-[5vh] ml-[60px] text-2xl">Settings</h1>
            <h3 className="mt-[1vh] ml-[60px] ">Make Your Settings</h3>
          </div>
          <div className="mt-[3vh] border-t border-black my-4 ml-[60px] w-290"></div>
          <div className="mt-[6vh] ml-[60px]">
            {/* Profile Picture, Label, and Upload Button in One Line */}
            <div className="flex items-center space-x-4">
              <div className="mt-[-7vh] w-[100px] h-[100px] rounded-full bg-amber-700"></div>
              <h2 className="text-lg font-semibold ml-[-115px] mt-25">Profile Picture</h2>
              <button className="ml-[800px] mt-10 px-10 py-2 bg-green-300 border-2 rounded-3xl">
                Upload
              </button>
            </div>

            {/* Divider Line (Kept in previous position) */}
            <div className="mt-[3vh] border-t border-black my-4 w-290"></div>
          </div>

          <div className="ml-[60px] space-y-5">
            {/* First Name Input */}
            <div className="ml-[5px] flex space-x-20 mt-8">
              {/* First Name */}
              <div className="flex flex-col">
                <h1 className="mb-4 text-lg font-semibold">First Name</h1>
                <input
                  type="text"
                  className="ml-[-2px] w-[250px] py-2 px-4 rounded-3xl bg-blue-400 text-white outline-none"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <h1 className="mb-4 text-lg font-semibold">Last Name</h1>
                <input
                  type="text"
                  className="ml-[-2px] w-[250px] py-2 px-4 rounded-3xl bg-blue-400 text-white outline-none"
                />
              </div>

              <div className="flex flex-col">
                <h1 className="mb-4 text-lg font-semibold">Phone Number</h1>
                <input
                  type="text"
                  className="ml-[-2px] w-[250px] py-2 px-4 rounded-3xl bg-blue-400 text-white outline-none"
                />
              </div>
            </div>
            {/* <button className="w-50 py-2 rounded-3xl ml-230 bg-green-400">Save</button> */}
            <div className="mt-[2vh] border-t border-black my-4 ml-[-1px] w-290"></div>
          </div>

          <div className="ml-[60px] space-y-5">
            <div className="ml-[5px] flex space-x-20 mt-8">
              <div className="flex flex-col">
                <h1 className="mb-4 text-lg font-semibold">Current Password</h1>
                <input
                  type="text"
                  className="ml-[-2px] w-[250px] py-2 px-4 rounded-3xl bg-blue-400 text-white outline-none"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col">
                <h1 className="mb-4 text-lg font-semibold">New Password</h1>
                <input
                  type="text"
                  className="ml-[-2px] w-[250px] py-2 px-4 rounded-3xl bg-blue-400 text-white outline-none"
                />
              </div>
            </div>
          </div>
          
          <button className="mt-6 px-12 py-2 rounded-3xl ml-248 border-2 bg-green-400">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default Setting;
