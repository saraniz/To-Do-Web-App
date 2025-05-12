import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetails, updateDetails } from "../Storage/Auth/AuthAction";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

// Helper function to convert array buffer to base64
function arrayBufferToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

const Setting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state) => state.user);

  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    password: "",
    newPassword: "",
    mobileNo: "",
    userQuote: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchUserDetails());
      setPageLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormData({
        fName: user.fName || "",
        lName: user.lName || "",
        password: "",
        newPassword: "",
        mobileNo: user.mobileNo || "",
        userQuote: user.userQuote || "",
      });

      if (user.profileImage && user.profileImage.data) {
        const base64String = arrayBufferToBase64(user.profileImage.data.data);
        setPreviewUrl(
          `data:${user.profileImage.contentType};base64,${base64String}`
        );
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    const form = new FormData();
    form.append("fName", formData.fName);
    form.append("lName", formData.lName);
    form.append("password", formData.password);
    form.append("newPassword", formData.newPassword);
    form.append("mobileNo", formData.mobileNo);
    form.append("userQuote", formData.userQuote);
    if (profileImage) {
      form.append("profileImage", profileImage);
    }

    dispatch(updateDetails(form));
    dispatch(fetchUserDetails());
  };

  if (pageLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex">
      <div className="bg-[#0A3A10] w-165">
        <div className="ml-[25px]">
          <SideBar />
        </div>
      </div>

      <div className="bg-[#F3FCF0] w-820 font-serif">
        <h1 className="mt-[5vh] ml-[60px] text-2xl font-semibold">Settings</h1>
        <h3 className="mt-[1vh] ml-[60px]">Make Your Settings</h3>
        <div className="mt-[3vh] border-t border-black my-4 ml-[60px] w-290"></div>

        {/* Profile Picture */}
        <div className="mt-[3vh] ml-[60px]">
          <div className="flex items-center space-x-10">
            <div className="flex flex-col items-center">
              <img
                src={previewUrl || "/path/to/default/image.jpg"}
                alt="Profile"
                className="w-[100px] h-[100px] rounded-full object-cover"
              />
              <h2 className="text-lg font-semibold mt-2">Profile Picture</h2>
            </div>

            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />

            <label
              htmlFor="profileImageInput"
              className="cursor-pointer ml-[800px] mt-18 px-7 py-1 bg-green-400 border-2 rounded-3xl inline-block text-center"
            >
              Upload
            </label>
          </div>

          <div className="mt-[3vh] border-t border-black my-4 w-290"></div>
        </div>

        {/* Personal Info */}
        <div className="ml-[60px] space-y-5">
          <div className="ml-[5px] flex space-x-20 mt-8">
            <div className="flex flex-col">
              <h1 className="mb-4 text-lg font-semibold">First Name</h1>
              <input
                type="text"
                name="fName"
                value={formData.fName}
                onChange={handleInputChange}
                className="w-[250px] py-2 px-4 rounded-3xl bg-transparent border-2 border-black text-black outline-none"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="mb-4 text-lg font-semibold">Last Name</h1>
              <input
                type="text"
                name="lName"
                value={formData.lName}
                onChange={handleInputChange}
                className="w-[250px] py-2 px-4 rounded-3xl bg-transparent border-2 border-black text-black outline-none"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="mb-4 text-lg font-semibold">Phone Number</h1>
              <input
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleInputChange}
                className="w-[250px] py-2 px-4 rounded-3xl bg-transparent border-2 border-black text-black outline-none"
              />
            </div>
          </div>
          <div className="mt-[2vh] border-t border-black my-4 ml-[-1px] w-290"></div>
        </div>

        {/* Quote */}
        <div className="ml-[60px] space-y-5">
          <div className="ml-[5px] flex flex-col mt-5">
            <h1 className="mb-4 text-lg font-semibold">Your Quote</h1>
            <textarea
              name="userQuote"
              value={formData.userQuote}
              onChange={handleInputChange}
              rows="2"
              className="w-[910px] py-2 px-4 rounded-3xl bg-transparent border-2 border-black text-black outline-none resize-none"
              placeholder="Write something inspiring or personal..."
            ></textarea>
          </div>
          <div className="mt-[2vh] border-t border-black my-4 ml-[-1px] w-290"></div>
        </div>

        {/* Passwords + Save Button */}
        <div className="ml-[60px] space-y-5">
          <div className="ml-[5px] flex space-x-20 mt-5 items-end">
            <div className="flex flex-col">
              <h1 className="mb-4 text-lg font-semibold">Current Password</h1>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-[250px] py-2 px-4 rounded-3xl bg-transparent border-2 border-black text-black outline-none"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="mb-4 text-lg font-semibold">New Password</h1>
              <input
                type="text"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className="w-[250px] py-2 px-4 rounded-3xl bg-transparent border-2 border-black text-black outline-none"
              />
            </div>

            <button
              onClick={handleSave}
              className="px-10 py-1 ml-75 mb-1 rounded-3xl border-2 bg-green-400"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
