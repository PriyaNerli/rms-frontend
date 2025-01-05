import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { BiRestaurant } from "react-icons/bi";

interface FormData {
  userName: string;
  email: string;
  password: string;
  phone: string;
}

interface FormErrors {
  userName?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    userName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Handle input changes
  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Validate inputs
  const validateInputs = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.userName) newErrors.userName = "User Name is required.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address.";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";
    if (!formData.phone || formData.phone.length !== 10)
      newErrors.phone = "Phone number must be 10 digits.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Submit handler

  const handleSubmit = async () => {
    if (validateInputs()) {
      try {
        const response = await axios.post(
          "http://localhost:9090/api/v1/auth/register",
          {
            username: formData.userName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
          }
        );

        notification.success({
          message:
            response?.data?.message || "Account Registered Successfully!",
          placement: "topRight",
          closeIcon: false,
          duration: 2,
        });
        navigate("/");
      } catch (error: any) {
        console.error("Error during API call:", error);
        notification.error({
          message:
            error.response?.data?.message ||
            "Email already register please login",
          placement: "topRight",
          closeIcon: false,
          duration: 2,
        });
        // Handle the error (e.g., show an error message to the user)
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
        <div className="welcome-section">
            <h1 className="main-heading">
            <strong> Welcome to Bhoojan</strong> – Where Every Meal is a Celebration!
            </h1>

            <p className="intro-text">
              Your culinary journey begins here. At Bhoojan, we believe that
              food is more than just sustenance 
              <h2 className="section-title">-it’s an experience, a memory,
              and a story waiting to be told.</h2>
            </p>

            <section className="why-choose-us">
              <h2 className="section-title"><strong>Why Choose Bhoojan?</strong></h2>
              <ul className="benefits-list">
                <li>
                  <span className="emoji">🌟</span>
                  <strong>Authenticity in Every Bite:</strong> We honor
                  tradition by preserving the time-tested recipes of our
                  ancestors while adding a touch of modern creativity to delight
                  your palate.
                </li>
                <li>
                  <span className="emoji">🍴</span>
                  <strong>Crafted with Love:</strong> From the freshest
                  ingredients to the final plating, every step is infused with
                  passion and dedication.
                </li>
                <li>
                  <span className="emoji">🍹</span>
                  <strong>A Symphony of Flavors:</strong> Discover a menu that
                  caters to every craving, blending diverse tastes into a
                  harmonious dining experience.
                </li>
              </ul>
            </section>

            <section className="closing-message">
              <h2 className="highlighted-text">
                At Bhoojan, we blend tradition with innovation to bring you the
                most authentic dining experience. Every dish tells a story,
                crafted with love and served with care.
              </h2>
            </section>
          </div>
        </div>
      </div>
      <div
        className="w-[60%] bg-white h-full flex justify-center items-center p-8"
        style={{
          backgroundImage: `url('https://inrestoblog.s3.ap-south-1.amazonaws.com/types1.png')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex h-[90%] flex-col w-[70%] justify-center items-center">
          <div className="flex justify-center items-center ">
            <BiRestaurant className="text-[#FF8C00] mr-2" size={32} />
            <h2 className="font-fancy text-4xl text-[#FF8C00] tracking-wide mb-4">
              Bhoojan
            </h2>
          </div>
          <p className=" font-fancy text-[#FF8C00] text-xl font-semibold mb-4 decoration-dashed">
            Help us with your details
          </p>

          <TextField
            id="userName"
            label={<span className="text-white">User Name</span>}
            variant="outlined"
            value={formData.userName}
            onChange={handleInputChange}
            error={!!errors.userName}
            helperText={errors.userName}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff", // Makes the input text white
                "& fieldset": { borderColor: "#FF8C00" }, // Default border color
                "&:hover fieldset": { borderColor: "#FF8C00" }, // Hover border color
                "&.Mui-focused fieldset": { borderColor: "#FF8C00" }, // Focus border color
              },
              "& .MuiInputLabel-root": {
                color: "#fff", // Makes the label text white
              },
              "& .MuiFormHelperText-root": {
                color: "#fff", // Makes the helper text white
              },
              marginBottom: "12px",
              width: "70%",
            }}
          />

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
                color: "#fff", // Makes the input text white
                "& fieldset": { borderColor: "#FF8C00" }, // Default border color
                "&:hover fieldset": { borderColor: "#FF8C00" }, // Hover border color
                "&.Mui-focused fieldset": { borderColor: "#FF8C00" }, // Focus border color
              },
              "& .MuiInputLabel-root": {
                color: "#fff", // Makes the label text white
              },
              "& .MuiFormHelperText-root": {
                color: "#fff", // Makes the helper text white
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
                color: "#fff", // Makes the input text white
                "& fieldset": { borderColor: "#FF8C00" }, // Default border color
                "&:hover fieldset": { borderColor: "#FF8C00" }, // Hover border color
                "&.Mui-focused fieldset": { borderColor: "#FF8C00" }, // Focus border color
              },
              "& .MuiInputLabel-root": {
                color: "#fff", // Makes the label text white
              },
              "& .MuiFormHelperText-root": {
                color: "#fff", // Makes the helper text white
              },
              marginBottom: "12px",
              width: "70%",
            }}
          />

          <TextField
            id="phone"
            label={<span className="text-white">Phone</span>}
            type="number"
            variant="outlined"
            value={formData.phone}
            onChange={handleInputChange}
            error={!!errors.phone}
            helperText={errors.phone}
            className="w-[70%] m-10"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#fff", // Makes the input text white
                "& fieldset": { borderColor: "#FF8C00" }, // Default border color
                "&:hover fieldset": { borderColor: "#FF8C00" }, // Hover border color
                "&.Mui-focused fieldset": { borderColor: "#FF8C00" }, // Focus border color
              },
              "& .MuiInputLabel-root": {
                color: "#fff", // Makes the label text white
              },
              "& .MuiFormHelperText-root": {
                color: "#fff", // Makes the helper text white
              },
              marginBottom: "12px",
              width: "70%",
            }}
          />
          <p className="font-fancy text-[#FF8C00] mt-4">
            Already have an account?{" "}
            <Link to="/" className="underline text-white hover:text-blue-800">
              Login
            </Link>
          </p>

          <button
            className="bg-[#FF8C00] text-white font-semibold px-6 py-2 rounded mt-6"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
