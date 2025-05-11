import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Storage/Auth/AuthAction";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //get state from redux store
  //useSelector is react redux hook.it let our component access to the redux store..get and read values from redux store
  //state mean get all the state of redux store and return only user state
  const { loading, user, error } = useSelector((state) => state.user);

  // console.log("sdata: ",fName,lName,email,password)

  //use dispatch function
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    //dipatch register action with credentials..send to the action
    dispatch(registerUser({ fName, lName, email, password },navigate));

  };

  return (
    <>
      <div className=" ml-[-380px] mt-[41vh]">
        <form onSubmit={handleSubmit}>
          <div className="flex  ">
            <input
              type="text"
              value={fName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="border-2 mr-2 bg-transparent w-35 bg-white border-black placeholder-gray-500 px-4 py-2 rounded-lg"
            />
            <input
              type="text"
              value={lName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              className="justify-center border-2 w-35 ml-2 bg-white border-black placeholder-gray-500 px-4 py-2 rounded-lg bg-transparent"
            />
          </div>
          <div className="">
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="justify-center border-2 w-74  mt-3 bg-white border-black placeholder-gray-500 px-4 py-2 rounded-lg bg-transparent"
            />
          </div>
          <div className="">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="justify-center border-2 w-74  mt-3 bg-white border-black placeholder-gray-500 px-4 py-2 rounded-lg bg-transparent"
            />
            <span onClick={() => setShowPassword(!showPassword)} 
                      className="absolute mt-6 ml-[-30px] cursor-pointer text-gray-600 hover:text-black"
              >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <div className=" p-8 flex justify-center">
            <div className="relative">
              <button
                className="ml-[-100px] relative w-49 py-2 px-4 bg-white border-2 border-black text-black font-medium hover:bg-gray-100 focus:outline-none"
                style={{
                  boxShadow: "2px 2px 0 0 black",
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
