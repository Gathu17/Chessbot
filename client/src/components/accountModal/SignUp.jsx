import React from 'react'
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <>
      <div className="flex p-10 mx-auto shadow-2xl shadow-[#333] rounded-md gap-6">
        <div className='absolute inset-0 bg-black -z-[1] opacity-[.8]'></div>
        <div className="w-full ">
          <p className="text-3xl text-center lg:text-4xl ">Create an account</p>
          <p className="text-center">
            Let's get started to create your account
          </p>
          <form action="post" className="flex flex-col px-8 space-y-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Eg. John Doe"
              className="px-2 py-2 border rounded"
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="you@email.com"
              className="px-2 py-2 border rounded"
            />
             <label htmlFor="email">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="********"
              className="px-2 py-2 border rounded"
            />
            <label htmlFor="email">Confirm Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="********"
              className="px-2 py-2 border rounded"
            />
            <div className='w-full !mt-6 flex flex-col space-y-3'>
              <button type="submit" className="px-4 py-2 text-white bg-gray-800 rounded">
                Create Account
              </button>
                <button type="submit" className="px-4 py-2 text-white bg-gray-800 rounded">
              <Link to={'/sign-in'}>
                  Already have an account? Sign in
              </Link>
                </button>
            </div>
            
          </form>
        </div>
        <div className="relative hidden w-full rounded lg:flex ">
          <img src="https://cdn2.iconfinder.com/data/icons/3d-chess/512/queen.png" alt="" className="rounded z-[999]"/>
        </div>
      </div>
    </>
  );
}

export default SignUp