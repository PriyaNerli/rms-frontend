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
      {isAuthenticated ? <Navbar /> : ""}
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6 p-8">About Us</h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Welcome to{" "}
            <span className="font-semibold text-blue-500">Our Restaurant</span>,
            where we celebrate the art of fine dining and culinary excellence.
            Nestled in the heart of the city, our establishment combines a warm
            ambiance, exceptional service, and a menu crafted to tantalize your
            taste buds.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Philosophy
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            At the core of our restaurant lies a passion for quality and
            authenticity. We believe in sourcing the freshest ingredients from
            local farms and markets, ensuring every dish reflects the vibrant
            flavors of the region. Whether it's a classic recipe or a modern
            twist, every plate tells a story of dedication and creativity.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Menu
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            From hand-crafted appetizers to decadent desserts, our menu offers
            something for everyone. Indulge in a variety of cuisines, including
            vegetarian, vegan, and gluten-free options, all prepared with care
            by our talented chefs. Pair your meal with our curated selection of
            wines and cocktails for the perfect dining experience.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Atmosphere
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Step into our restaurant and be greeted by an inviting ambiance that
            feels like home. Whether you're here for an intimate dinner, a
            family gathering, or a special celebration, our elegant interiors
            and cozy seating arrangements are designed to create unforgettable
            moments.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Commitment
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Your satisfaction is our priority. Our dedicated team of
            professionals strives to provide impeccable service and ensure every
            visit leaves a lasting impression. We're proud to be a part of your
            cherished memories and look forward to welcoming you again and
            again.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Come and experience the magic of dining with us. Make a reservation
            today or simply walk in to discover why we're the go-to destination
            for food lovers in the city. Thank you for choosing us as your
            culinary partner, and we can't wait to serve you!
          </p>
        </div>
      </div>
    </div>
  );
};
