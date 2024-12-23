import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

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
          "http://localhost:8080/api/v1/auth/register",
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
          <h1>
            Please enter few things which will look good , like a letter saying
            so and so
          </h1>
          <h2 className="mt-20">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
            omnis voluptatum voluptas laborum optio. Earum commodi aliquid non
            labore ipsa perferendis quae. Libero vero numquam eveniet nisi
            quibusdam cumque dolorum.
          </h2>
        </div>
      </div>
      <div className="w-[60%] bg-white h-full flex justify-center items-center p-8">
        <div className="flex h-[90%] flex-col w-[70%] justify-center items-center">
          <h2 className="font-fancy text-4xl text-[#FF8C00] tracking-wide mb-4">
            Bhoojan
          </h2>
          <p className=" font-fancy text-[#FF8C00] text-xl font-semibold mb-4 decoration-dashed">
            Help us with your details
          </p>

          <TextField
            id="userName"
            label={<span className="text-[#000]">User Name</span>}
            variant="outlined"
            value={formData.userName}
            onChange={handleInputChange}
            error={!!errors.userName}
            helperText={errors.userName}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#FF8C00" },
                "&:hover fieldset": { borderColor: "#FF8C00" },
                "&.Mui-focused fieldset": { borderColor: "#FF8C00" },
              },
              marginBottom: "12px",
              width: "70%",
              fontFamily: "roboto",
            }}
          />

          <TextField
            id="email"
            label={<span className="text-[#000]">Email</span>}
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
            label={<span className="text-[#000]">Password</span>}
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

          <TextField
            id="phone"
            label={<span className="text-[#000]">Phone</span>}
            type="number"
            variant="outlined"
            value={formData.phone}
            onChange={handleInputChange}
            error={!!errors.phone}
            helperText={errors.phone}
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
            Already have an account?{" "}
            <Link
              to="/"
              className="underline text-blue-600 hover:text-blue-800"
            >
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
