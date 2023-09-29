import React, { useState } from "react";
import {
  FaRegEye,
  FaRegEyeSlash,
  FaToggleOn,
  FaToggleOff,
  FaFacebookF,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [errorTracker, setErrorTracker] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorTracker(true);
      return;
    }
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone Number:", phoneNumber);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  };

  const isPasswordValid = () => {
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSmallLetter = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
      password
    );

    return (
      hasCapitalLetter && hasSmallLetter && hasNumber && hasSpecialCharacter
    );
  };

  const getPasswordColor = (rule) => (rule ? "text-green-500" : "text-[#aaa]");

  return (
    <>
      <div className="absolute inset-0 opacity-[.8] bg-[#333] -z-[2]"></div>
      <div className="pt-5 text-center ">
        <p className="text-2xl text-white font-[800] leading-7">Welcome!</p>
        <p className="text-3xl text-white font-[400]">
          Log-in to your Game-Place
        </p>
      </div>
      <div className="h-fit w-screen py-[5rem] flex justify-evenly items-center px-4">
        <div className="justify-center hidden w-full lg:flex">
          <img
            src="https://cdn0.iconfinder.com/data/icons/3d-dynamic-color/512/chess-dynamic-color.png"
            alt=""
          />
        </div>

        <div className="flex flex-col w-full">
          <form
            onSubmit={handleSubmit}
            className="w-[70%] px-8 pt-6 pb-8 my-4 space-y-4 bg-[#333] rounded shadow-md mx-auto lg:mx-0"
          >
            <div className="space-y-4">
              <label
                className="block text-sm font-bold text-[#ddd]"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Full Name"
                className="w-full px-3 py-3 leading-tight text-[#000] border rounded appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="space-y-4">
              <label
                className="block text-sm font-bold text-[#ddd] 2"
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
                className="w-full px-3 py-3 leading-tight text-[#000] border rounded appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="space-y-4">
              <label
                className="block text-sm font-bold text-[#ddd] 2"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                placeholder="+254712345678"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full px-3 py-3 leading-tight text-[#000] border rounded appearance-none focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="space-y-4">
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
                  className="w-full px-3 py-3 leading-tight text-[#000] rounded appearance-none focus:outline-none focus:shadow-outline"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-0 right-0 w-8 h-full px-2 py-2 text-[#eee] focus:outline-none"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>

              <p
                className={`italic text-[10px] text-[#eee] ${
                  password.length > 0 ? "hidden" : ""
                }`}
              >
                Must be at least 8 characters
              </p>
              <div
                className={`flex mt-2 flex-col ${
                  password.length === 0 ? "hidden" : ""
                }  ${confirmPassword.length > 0 ? "hidden" : ""}`}
              >
                <span
                  className={`flex items-center gap-2 mr-2 ${getPasswordColor(
                    /[A-Z]/.test(password)
                  )}`}
                >
                  {/[A-Z]/.test(password) ? <FaToggleOn /> : <FaToggleOff />}
                  Capital Letter
                </span>
                <span
                  className={`flex items-center gap-2 mr-2 ${getPasswordColor(
                    /[a-z]/.test(password)
                  )}`}
                >
                  {/[a-z]/.test(password) ? <FaToggleOn /> : <FaToggleOff />}
                  Small Letter
                </span>
                <span
                  className={`flex items-center gap-2 mr-2 ${getPasswordColor(
                    /\d/.test(password)
                  )}`}
                >
                  {/\d/.test(password) ? <FaToggleOn /> : <FaToggleOff />}
                  Number
                </span>
                <span
                  className={`flex items-center gap-2 mr-2 ${getPasswordColor(
                    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
                  )}`}
                >
                  {/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) ? (
                    <FaToggleOn />
                  ) : (
                    <FaToggleOff />
                  )}
                  Special Character
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <label
                className="block text-sm font-bold text-[#ddd] 2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative border">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder="********"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-3 py-3 leading-tight text-[#000] border rounded appearance-none focus:outline-none focus:shadow-outline"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility2}
                  className="absolute top-0 right-0 w-8 h-full px-2 py-2 text-[#eee] focus:outline-none"
                >
                  {showPassword2 ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </div>
            <p
              className={`italic text-[13px] text-red-600 ${
                errorTracker ? "" : "hidden"
              }`}
            >
              * Passwords Do Not Match!
            </p>

            <button
              type="submit"
              disabled={!isPasswordValid() || password !== confirmPassword}
              className={`${
                !isPasswordValid() || password !== confirmPassword
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full !mt-8`}
            >
              Create Account
            </button>
            <p className="flex justify-center mt-4">or</p>
            <button className="flex items-center justify-center w-full p-3 mt-4 border rounded gap-x-3">
              <FcGoogle className="text-2xl" /> Continue with Google
            </button>
            <button className="flex items-center justify-center w-full p-3 mt-4 border rounded gap-x-3">
        <FaFacebookF className="text-2xl bg-[#0866FF]" /> Continue with Facebook
      </button>
            <p className="flex justify-center mt-6">
              Already have an account?
              <span className="font-[500] ml-1 underline">
                <Link to="/sign-in">Log In </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
