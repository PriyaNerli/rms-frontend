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
    <div>
      {isAuthenticated ? <Navbar /> : ""}
      <h2>About</h2>
    </div>
  );
};
