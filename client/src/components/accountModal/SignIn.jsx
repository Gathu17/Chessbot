import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Redux from "../../redux/redux";
import Login from '../../api/auth/loginApi'

// import { auth } from "../accountModal/Firebase";

const SignIn = () => {
  const [credentials, setCredentials] =  useState({
    email: '',
    password: ''
  })
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const handleGoogleSignIn = async () => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   try {
  //     const result = await auth.signInWithPopup(provider);
  //     console.log("Google Sign-In successful:", result.user);
  //   } catch (error) {
  //     console.error("Google Sign-In failed:", error);
  //   }
  // };
   const handleSubmit = (e) => {
    e.preventDefault()
    console.log(credentials);
    Login(credentials) 
   }
   const onChange = (event) => {
     setCredentials({...credentials,[event.target.name]: event.target.value})
   }

  


  return (
    <>
      <div className="hidden">
        <Redux token={token} />
      </div>
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
        <div className="container flex items-center mx-auto justify-evenly">
          <div className="justify-center hidden w-full lg:flex ">
            <img
              src="https://cdn3.iconfinder.com/data/icons/hobbies-and-free-time-17/512/Chess_Chess_game_Game_Marketing_Pawn_Pawns_Strategy.png"
              alt=""
            />
          </div>

          <div className="flex flex-col w-full">
            <form
              onSubmit={handleSubmit}
              className="lg:w-[70%] px-8 pt-6 pb-8 my-4 space-y-6 bg-[#333] rounded shadow-md"
            >
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-[#ddd]"
                  htmlFor="username"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={credentials.email}
                  placeholder="email@example.com"
                  onChange={onChange}
                  required
                  className="w-full px-3 py-2 leading-tight border rounded appearance-none focus:outline-none focus:shadow-outline text-[black]"
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
                    value={credentials.password}
                    placeholder="********"
                    onChange={onChange}
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
              <div
                // onClick={handleGoogleSignIn}
                className="flex items-center justify-center w-full p-3 mt-4 border rounded gap-x-3"
              >
                <FcGoogle className="text-2xl" /> Continue with Google
              </div>
              <p className="flex justify-center mt-6">
                Don't have an account?
                <span className="font-[500] ml-1 underline">
                  <Link to={"/sign-up"}>Create Now</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
