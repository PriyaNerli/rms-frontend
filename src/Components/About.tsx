import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export const About = () => {
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isAuthenticated && <Navbar />}
      <div className="flex justify-center items-center bg-gray-100 mt-20 p-6">
        <div className="max-w-5xl bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              About Us
            </h1>
            <p className="text-lg font-semibold text-gray-600 ">
              Discover the journey of taste, passion, and excellence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-gray-800">
                Our Philosophy
              </h2>
              <p className="text-lg text-gray-600">
                At the heart of our restaurant is a commitment to quality,
                authenticity, and creativity. From farm-fresh ingredients to
                innovative recipes, every dish tells a story of passion.
              </p>
            </div>
            <img
              src="https://assets.architecturaldigest.in/photos/658e6749009d551799adc8d2/16:9/w_2560%2Cc_limit/Bawri%2520Interior%25205.jpg"
              alt="Philosophy of food"
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
            <img
              src="https://www.aabhishek.com/wp-content/uploads/2022/08/south-indian-cafe-food-menu.jpg"
              alt="Delicious Menu"
              className="rounded-lg shadow-lg"
            />
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-gray-800">Our Menu</h2>
              <p className="text-lg text-gray-600">
                Savor hand-crafted appetizers, indulgent main courses, and
                exquisite desserts. Our diverse menu caters to all preferences,
                including vegetarian, vegan, and gluten-free options.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center mt-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-gray-800">
                Our Atmosphere
              </h2>
              <p className="text-lg text-gray-600">
                Enjoy a cozy, elegant ambiance perfect for intimate dinners,
                family gatherings, or special celebrations.
              </p>
            </div>
            <img
              src="https://assets.architecturaldigest.in/photos/6385cf3311f0276636badfb6/4:3/w_1440,h_1080,c_limit/DSC_8367-Edit-W.png"
              alt="Restaurant Atmosphere"
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
             Our Location
            </h2>
            <p className="text-lg text-gray-600 mt-4">
            Bhooja, 123 Gourmet Street, Foodie Town, Tastyville State 45678<br/>
             Phone: 7483201588 Email: info@bhooja.com
            </p>

          <div className="mt-12 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              Make Your Reservation
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Experience the magic of dining with us. Reserve your table today!
            </p>
            <button
              className="mt-6 bg-[#FF8C00] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition"
              onClick={() => navigate("/book-table")}
            >
              Reserve Now
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
