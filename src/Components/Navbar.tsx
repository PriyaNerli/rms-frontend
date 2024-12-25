import React, { useState } from "react";
import { Link } from "react-scroll";
import { BiRestaurant } from "react-icons/bi";
import Button from "../layouts/Button";
import { AiOutlineMenuUnfold } from "react-icons/ai";
// import { BiChevronDown } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar: React.FC = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/logout"
      );
      localStorage.removeItem("authToken");
      console.log("logout", response);
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div>
        <div className=" flex flex-row justify-between p-5 md:px-32 px-5 bg-[#FF8C00] shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className=" flex flex-row items-center cursor-pointer">
            <span>
              <BiRestaurant size={32} />
            </span>
            <h1 className="text-xl font-semibold">Bhoojan</h1>
          </div>

          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              Home
            </Link>
            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={() => navigate("/about")}
            >
              About
            </Link>

            <Link
              to="review"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={() => navigate("/book-table")}
            >
              Book Table
            </Link>

            <Link
              to="dishes"
              spy={true}
              smooth={true}
              duration={500}
              className="hover:text-brightColor transition-all cursor-pointer"
              onClick={() => navigate("/dishes")}
            >
              Dishes
            </Link>
            <Button title="Logout" onClick={handleLogout} />
          </nav>

          <div className="md:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleChange} />
            ) : (
              <AiOutlineMenuUnfold size={25} onClick={handleChange} />
            )}
          </div>
        </div>
        <div
          className={` ${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute bg-black text-white left-0 top-20 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={() => navigate("/about")}
          >
            About
          </Link>
          <Link
            to="menu"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Menu
          </Link>
          <Link
            to="review"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Book Table
          </Link>
          <Link
            to="dishes"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Dishes
          </Link>

          <Button onClick={handleLogout} title="Logout" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
