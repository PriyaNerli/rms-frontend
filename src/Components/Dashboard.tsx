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
      // Uncomment this line to redirect to login if unauthenticated
      // navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      {isAuthenticated && <Navbar />}
      {isAuthenticated ? (
        <div
          className="min-h-screen flex flex-row justify-between items-center lg:px-32 px-5 bg-[url('./assets/img/hero.jpg')] bg-cover bg-no-repeat"
        >
          <div className="w-full lg:w-2/3 space-y-5">
            <h1 className="text-white font-bold text-6xl">
              Elevate Your Inner Foodie with Every Bite.
            </h1>
            <p className="text-white text-lg leading-relaxed">
              Explore a world of flavors crafted with passion. Unleash your culinary dreams
              and redefine the art of dining with us.
            </p>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full bg-black text-white flex flex-col justify-center items-center">
          <p className="border-4 border-gray-600 w-[80%] h-28 flex flex-col justify-center items-center p-5 rounded-lg">
            <span className="text-red-600 font-bold text-xl">
              Haha..! Caught you. Please log in to access the dashboard.
            </span>
          </p>
          <button
            className="mt-4 px-6 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
            onClick={() => navigate("/")}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};
