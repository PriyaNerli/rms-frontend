import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { REVIEWS } from "../layouts/Constant";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookedTables, setBookedTables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      fetchBookedTables();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchBookedTables = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/bookings/all");
      const data = await response.json();

      if (response.ok) {
        setBookedTables(data.bookings || []);
      } else {
        console.error("Failed to fetch booked tables:", data.message);
      }
    } catch (error) {
      console.error("Error fetching booked tables:", error);
    }
  };

  return (
    <div>
      {isAuthenticated && <Navbar />}
      {isAuthenticated ? (
        <div className="min-h-screen bg-gray-100">
          {/* Hero Section */}
          <div className="flex justify-start items-center h-[400px] bg-[url('./assets/img/hero.jpg')] bg-cover bg-center text-white text-center p-4">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                Elevate Your Inner Foodie
              </h1>
              <p className="text-lg lg:text-xl">
                Explore a world of flavors crafted with passion.
              </p>
            </div>
          </div>

          {/* Booked Tables Section */}
          <div className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-5">
              Booked Tables
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookedTables?.map((table: any, index: number) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-300 w-12 h-12 rounded-full flex justify-center items-center text-lg font-bold">
                      {table.tableId}
                    </div>
                    <h3 className="ml-4 text-xl font-semibold">
                      Table {table.tableId}
                    </h3>
                  </div>
                  <p className="text-gray-600">
                    <strong>Name:</strong> {table.guestName}
                  </p>
                  <p className="text-gray-600">
                    <strong>Special Request:</strong> {table.specialRequest}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-5 ">
              Google Reviews
            </h2>
            <div className="flex justify-center items-center h-full w-full">
              <Carousel
                showThumbs={false}
                infiniteLoop
                autoPlay
                showStatus={false}
                interval={2000}
                className="w-full max-w-3xl"
              >
                {REVIEWS.map((review: any, index: number) => (
                  <div
                    key={index}
                    className="flex justify-center items-center bg-white p-6 rounded-lg shadow-md"
                  >
                    {/* <img
                      src="https://cdn-icons-png.flaticon.com/512/1882/1882606.png"
                      alt="Review Icon"
                      className="rounded-full mr-4"
                    /> */}
                    <div>
                      <p className="text-lg font-semibold">{review.reviewer}</p>
                      <p className="text-gray-600">{review.review}</p>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
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
