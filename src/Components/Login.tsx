import { TextField } from "@mui/material";
import { notification } from "antd";
import axios from "axios";
import { url } from "node:inspector";
import React, { useState } from "react";
import { BiRestaurant } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateInputs = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address.";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleLogin = async () => {
    if (validateInputs()) {
      try {
        const response = await axios.post(
          "http://localhost:9090/api/v1/auth/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );
        const token = response?.data?.token;

        localStorage.setItem("authToken", token);

        notification.success({
          message: response?.data?.message || "Login Successfully!",
          placement: "topRight",
          closeIcon: false,
          duration: 2,
        });
        navigate("/dashboard");
      } catch (error: any) {
        notification.error({
          message:
            error.response?.data?.message ||
            "Invalid Credentials or User not found",
          placement: "topRight",
          closeIcon: false,
          duration: 2,
        });

        if (axios.isAxiosError(error)) {
          console.error("Axios error details:", error.response?.data?.message);
        }
      }
    }
  };

  return (
    <div className="w-full h-screen flex">  
      <div className="w-[40%] bg-[#FF8C00] h-full p-8 flex justify-center items-center">
        <div className="h-[90%] p-8 bg-[#F5F5DC]">
          <h1>
          Your Tastebuds Deserve the Best
          </h1>
          <h2 className="mt-20">
          At Bhoojan, we blend tradition with innovation to bring you the most authentic dining experience. Every dish tells a story, crafted with love and served with care
          </h2>
        </div>
      </div>
      <div className="w-[60%] bg-white h-full flex justify-center items-center p-8" 
      style={{backgroundImage:`url('https://inrestoblog.s3.ap-south-1.amazonaws.com/types1.png')`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}
      >
        <div className="flex h-[90%] flex-col w-[70%] justify-center items-center">
          <div className="flex justify-center items-center ">
            <BiRestaurant className="text-[#FF8C00] mr-2" size={32} />
            <h2 className="font-fancy text-4xl text-[#FF8C00] tracking-wide mb-4">
              Bhoojan
            </h2>
          </div>
          <p className=" font-fancy text-[#FF8C00] text-xl font-semibold mb-4 decoration-dashed">
            Welcome!
          </p>

          <TextField
            id="email"
            label={<span className="text-white">Email</span>}
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            className="w-[70%] m-10"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#FF8C00" },
                "&:hover fieldset": { borderColor: "#FF8C00" },
                "&.Mui-focused fieldset": { borderColor: "#FF8C00" },
              },
              marginBottom: "12px",
              width: "70%",
            }}
          />

          <TextField
            id="password"
            label={<span className="text-white">Password</span>}
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
            className="w-[70%] m-10"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#FF8C00" },
                "&:hover fieldset": { borderColor: "#FF8C00" },
                "&.Mui-focused fieldset": { borderColor: "#FF8C00" },
              },
              marginBottom: "12px",
              width: "70%",
            }}
          />

          <p className="font-fancy text-[#FF8C00] mt-4">
            Don’t have an account yet?{" "}
            <Link
              to="/register"
              className="underline text-white hover:text-blue-800"
            >
              Register
            </Link>
          </p>

          <button
            className="bg-[#FF8C00] text-white font-semibold px-6 py-2 rounded mt-6"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};