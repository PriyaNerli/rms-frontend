import React from "react";
// import { useNavigate } from "react-router-dom";

interface ButtonProps {
  title: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <button
      className="px-6 py-1 border-2 border-brightColor text-brightColor hover:bg-brightColor hover:text-white transition-all rounded-full"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
