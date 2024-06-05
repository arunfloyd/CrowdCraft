import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { addUser } from "../slices/userSlice";

const UserLogin = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = {
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
      };
      console.log(data);

      const result = await axios.post("http://localhost:8080/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.data.message) {
        setError(result.data.message);
      } else {
        dispatch(addUser({ ...result.data.user }));
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError(() => "Invalid Credentials");
    }
  };

  return (
    <div className="bg-white-100 flex min-h-screen items-center justify-center">
      <form
        className="mx-auto w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl"
        onSubmit={onSubmit}
      >
        <div>
          <h1 className="mb-5 text-center font-serif text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Login Your Account
          </h1>
        </div>
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
            required
            ref={emailRef}
          />
          <label
            htmlFor="floating_email"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Email address
          </label>
        </div>
        <div className="group relative z-0 mb-5 w-full">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
            required
            ref={passwordRef}
          />
          <label
            htmlFor="floating_password"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:translate-x-1/4"
          >
            Password
          </label>
        </div>
        {error && <p className="mt-1  text-center text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Submit
        </button>
        <div>
          <p className="p-2 font-serif">
            New to the Town?{" "}
            <Link to="/register">
              <span className="font-bold">Click Here</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
