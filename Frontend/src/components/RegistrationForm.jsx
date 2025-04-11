import React, {useState} from 'react'

const RegistrationForm= () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()

    }

    return(
        <>
        <div className=" ml-[-380px] mt-[43vh]">
        <form onSubmit={handleSubmit}>
          <div className="flex  ">
            <input
              type="text"
              value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              className="border-2 mr-2 bg-transparent w-35 bg-white border-black placeholder-gray-500 px-4 py-2 rounded-lg"
            />
            <input
              type="text"
              value={lastName}
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
              className="justify-center border-2 w-74  mt-3 bg-white border-black placeholder-gray-500 px-4 py-2 rounded-lg bg-transparent"
            />
          </div>
          <div className="">
          <input
              type="text"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="justify-center border-2 w-74  mt-3 bg-white border-black placeholder-gray-500 px-4 py-2 rounded-lg bg-transparent"
            />
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

    )
}

export default RegistrationForm