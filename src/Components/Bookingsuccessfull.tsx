import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BookingSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('loc==>',location.state)
  const bookingDetails = location.state;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white max-w-md w-full p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-[#FF8C00] mb-4">
          Booking Confirmed!
        </h2>
        <p className="text-gray-700 mb-6">
          Thank you, {bookingDetails?.guestName}! Your table has been successfully booked.
        </p>
        <div className="text-left mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Booking Details:</h3>
          <ul className="text-gray-600">
            <li>
              <strong>Date:</strong> {bookingDetails?.date}
            </li>
            <li>
              <strong>Time:</strong> {bookingDetails?.time}
            </li>
            <li>
              <strong>Table for:</strong> {bookingDetails?.tableId} people
            </li>
            <li>
              <strong>Special Request:</strong> {bookingDetails?.specialRequest || "None"}
            </li>
          </ul>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-[#FF8C00] text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
