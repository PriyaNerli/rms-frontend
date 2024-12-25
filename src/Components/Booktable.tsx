import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { DatePicker, TimePicker, message, notification } from "antd";
import dayjs, { Dayjs } from "dayjs";

export const Booktable: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
  const [bookingTime, setBookingTime] = useState<Dayjs | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [availableTables, setAvailableTables] = useState<number[]>([]);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      fetchAvailableTables();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchAvailableTables = async () => {
    // Mock API call to fetch available tables
    const tables = [1, 2, 3, 4, 5]; // Example table IDs
    setAvailableTables(tables);
  };

  const resetData = () => {
    setBookingDate(null);
    setBookingTime(null);
    setGuestName("");
    setGuestPhone("");
    setSpecialRequest("");
    setSelectedTable(null);
  };

  const handleSubmit = async () => {
    if (
      !bookingDate ||
      !bookingTime ||
      !guestName ||
      !guestPhone ||
      !selectedTable
    ) {
      notification.error({
        message: "Please fill in all fields.",
      });
      return;
    }

    const bookingDetails = {
      tableId: selectedTable,
      date: bookingDate.format("YYYY-MM-DD"),
      time: bookingTime.format("HH:mm"),
      guestName,
      guestPhone,
      specialRequest,
    };

    resetData();

    // Mock API call to submit booking
    console.log("Booking details:", bookingDetails);
    notification.success({
      message: "Table booked successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isAuthenticated && <Navbar />}
      <div className="flex justify-center items-center mt-20 p-6">
        <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 font-fancy">
            Book a Table
          </h2>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <DatePicker
              className="w-full border border-gray-300 rounded-lg p-2"
              value={bookingDate}
              onChange={(date) => setBookingDate(date)}
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time
            </label>
            <TimePicker
              className="w-full border border-gray-300 rounded-lg p-2"
              value={bookingTime}
              onChange={(time) => setBookingTime(time)}
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guest Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2"
              rows={3}
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Table
            </label>
            <div className="flex gap-3 flex-wrap">
              {availableTables.map((table) => (
                <button
                  key={table}
                  className={`px-5 py-2 rounded-lg font-medium transition ${
                    selectedTable === table
                      ? "bg-[#FF8C00] text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  }`}
                  onClick={() => setSelectedTable(table)}
                >
                  Table {table}
                </button>
              ))}
            </div>
          </div>
          <button
            className="w-full bg-[#FF8C00] text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition mt-6"
            onClick={handleSubmit}
            disabled={
              !bookingDate ||
              !bookingTime ||
              !guestName ||
              !guestPhone ||
              !selectedTable
            }
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
