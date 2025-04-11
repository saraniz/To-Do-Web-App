import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage("Email and Password cannot be empty");
    } else {
      setErrorMessage("User successful logged.");
    }

    onLogin(email, password);
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
              className="border-2 bg-transparent w-70 bg-white border-black placeholder-gray-500 px-4 py-2 rounded-lg"
            />
          </div>
          <div className="">
            <input
              type="text"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 mt-[2vh] w-70 bg-white border-black placeholder-gray-500 px-4 py-2 rounded-lg bg-transparent"
            />
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
