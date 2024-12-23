import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      setIsAuthenticated(true);
    } else {
      //navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      {isAuthenticated ? <Navbar /> : ""}
      {isAuthenticated ? (
        <div className=" min-h-screen flex flex-row justify-between items-center lg:px-32 px-5 bg-[url('./assets/img/hero.jpg')] bg-cover bg-no-repeat ">
          <div className=" w-full lg:w-2/3 space-y-5">
            <h1 className=" text-backgroundColor font-semibold text-6xl">
              Elevate Your Inner Foodie with Every Bite.
            </h1>
            <p className="text-white">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis et
              qui, maxime assumenda repellat corrupti officia dolorum delectus
              labore deleniti?
            </p>
            <div className=" lg:pl-44">
              <Button title="Order Now" />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full bg-black text-white flex justify-center items-center">
          <p className="flex-col border-4 w-[80%] h-28 flex justify-center items-center">
            <span className="text-red-600 font-semibold text-xl">
              Haha..! Caught you. Please login to access the dashboard{" "}
            </span>
            <button
              className="mt-4 w-20 rounded h-8 bg-[#FF0000] color-white"
              onClick={() => navigate("/")}
            >
              Login
            </button>
          </p>
        </div>
      )}
    </div>
  );
};
