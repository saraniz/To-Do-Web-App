import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import {userLogin} from '../Storage/Auth/AuthAction'
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const {loading,user,error} = useSelector((state)=> state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("SD: ",email,password)
    dispatch(userLogin({email,password},navigate))

    // if (email === "" || password === "") {
    //   setErrorMessage("Email and Password cannot be empty");
    // } else {
    //   setErrorMessage("User successful logged.");
    // }

    // onLogin(email, password);
    
  };

  return (
    <>
      <div className=" ml-[-380px] mt-[43vh]">
        <form onSubmit={handleSubmit}>
          <div className="">
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-2 bg-transparent w-70 bg-white border-black placeholder-gray-500 px-4 py-2 rounded-lg"
            />
          </div>
          <div className="">
            <input
              type={showPassword? 'text':'password'}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-2 mt-[2vh] w-70 bg-white border-black placeholder-gray-500 px-4 py-2 rounded-lg bg-transparent"
            />
            <span onClick={() => setShowPassword(!showPassword)} 
                      className="absolute mt-6 ml-[-30px] cursor-pointer text-gray-600 hover:text-black"
              >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>
          <div className=" p-9 flex justify-center">
            <div className="relative">
              <button
                className="ml-[-100px] relative w-49 py-2 px-4 bg-white border-2 border-black text-black font-medium hover:bg-gray-100 focus:outline-none"
                style={{
                  boxShadow: "2px 2px 0 0 black",
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
