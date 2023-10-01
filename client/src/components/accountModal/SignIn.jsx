import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate  } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        toast.success("Login Successful")
       setTimeout(()=>{
        navigate("/");
       },2000)
      } else {
        const data = await response.json();
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };


  return (
      <>
       <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
        }}
      />
      <div className="absolute inset-0 opacity-[.8] bg-[#333] -z-[2]"></div>
   <div className="pt-5 text-center">
   <p className="text-2xl text-white font-[800] leading-7">Welcome!</p>
          <p className="text-3xl text-white font-[400]">
            Sign-up to the Best Game-Place
          </p>
   </div>
    <div className="h-fit w-screen  py-[5rem] flex justify-evenly items-center px-4 ">
      <div className="container flex items-center mx-auto justify-evenly" >
      <div className="justify-center hidden w-full lg:flex">

          <img
            src="https://cdn3.iconfinder.com/data/icons/hobbies-and-free-time-17/512/Chess_Chess_game_Game_Marketing_Pawn_Pawns_Strategy.png"
            alt=""
          />
        </div>

        <div className="flex flex-col w-full">

         
          <form
            onSubmit={handleSubmit}
            className="w-[70%] px-8 pt-6 pb-8 my-4 space-y-6 bg-[#333] rounded shadow-md mx-auto lg:mx-0"

          >
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-[#ddd]"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="example@mail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 leading-tight text-[#ddd] border rounded appearance-none focus:outline-none focus:shadow-outline text-[black]"
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-bold text-[#ddd]"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative border">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 leading-tight text-[#000] rounded appearance-none focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-0 right-0 w-8 h-full px-2 py-2 text-gray-600 focus:outline-none"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-500 form-checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <span className="ml-2 mt-1 text-[#ddd] text-[14px]">
                    Remember me
                  </span>
                </label>
                <p className="text-[10px] italic text-[#eee] flex justify-end">
                  Forgot Password ?
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Log In
            </button>
            <p className="flex justify-center mt-4">or</p>
            <button className="flex items-center justify-center w-full p-3 mt-4 border rounded gap-x-3">
              <FcGoogle className="text-2xl" /> Continue with Google
            </button>
            <p className="flex justify-center mt-6">
              Don't have an account?
              <span className="font-[500] ml-1 underline"><Link to={"/sign-up"}>Create Now</Link></span>
            </p>
          </form>
        </div>
      </div>
    </div>
   </>
  );
};

export default SignIn;
