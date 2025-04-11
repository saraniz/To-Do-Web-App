import React from "react";
import gesture from "../assets/gesture.png";
import RegistrationForm from "../components/RegistrationForm";
import GoogleIcon from '@mui/icons-material/Google';  // Correct the import
import logo from "../assets/logo.png"
import homepageimage from "../assets/homepageimage.png"
import { Link } from 'react-router-dom';  // Correct the import


const RegistrationPage = () => {

  const handleLogin = (email, password) => {
    console.log("logged");
  };

  return (
    <>
      <div className="min-h-screen flex ">
        <div className="Column1 bg-[#0D4715] w-9/13">
          <img className=" w-50 h-50" src={logo} />
          <img className="w-120 h-110 ml-[250px] mt-[-15vh]" src={homepageimage} />
          <h2 className="text-5xl text-black font-mono font-bold  ml-[180px] mt-[5vh] italic">Get Things Done<br/>One List At A Time.</h2>
        </div>
        <div className="Column2 bg-[#F8EFE0] w-4/13 flex ">
          <h1 className="mt-[15vh] ml-[200px] font-mono text-5xl leading-12.5 font-bold">
            Hello <br />
            Again!
          </h1>
          <img className="mt-[16vh] ml-[-280px] w-23 h-23" src={gesture} />
        </div>
        <div className="flex">
          <h4 className="mt-[37vh] ml-[-380px] font-mono font-bold">
            Enter Your Credentials
          </h4>
        </div>
        <div>
          <RegistrationForm />
        </div>
        <div className="flex">
          <h4 className="mt-[78vh] ml-[-380px] font-mono font-bold">
            Already have an account?{" "}
            <Link to="/loginpage" className="text-blue-500 underline hover:text-blue-700">Sign In</Link>
          </h4>
        </div>
        <div className="ml-[-350px] mt-[84vh]">
          <button
            type="submit"
            className="border-2 border-black py-1 rounded-xl text-black flex items-center justify-center space-x-3 w-54 bg-transparent"
          >
            <GoogleIcon style={{ fontSize: 20 }} />
            <span>Sign In With Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
