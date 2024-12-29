import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./Components/Register";
import { Login } from "./Components/Login";
import { Dashboard } from "./Components/Dashboard";
import { About } from "./Components/About";
import { Booktable } from "./Components/Booktable";
import { Dishes } from "./Components/Dishes";
import BookingSuccess from "./Components/Bookingsuccessfull";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/book-table" element={<Booktable />} />
        <Route path="/dishes" element={<Dishes />} />
        <Route path="/bookingsuccess" element={<BookingSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
