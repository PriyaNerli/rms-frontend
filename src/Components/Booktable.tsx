import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { DatePicker, TimePicker, message, notification } from "antd";
import type { GetProps } from "antd";
import dayjs, { Dayjs } from "dayjs";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

export const Booktable: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
  const [bookingTime, setBookingTime] = useState<Dayjs | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [availableTables, setAvailableTables] = useState<number[]>([]);
  const [selectedpeople, setSelectedPeople] = useState("");
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
    const tables = [1, 2, 3, 4, 5, 6]; // Example table IDs
    setAvailableTables(tables);
  };

  const resetData = () => {
    setBookingDate(null);
    setBookingTime(null);
    setGuestName("");
    setGuestPhone("");
    setSpecialRequest("");
    setSelectedPeople("");
  };

  const handleSubmit = async () => {
    if (
      !bookingDate ||
      !bookingTime ||
      !guestName ||
      !guestPhone ||
      !selectedpeople
    ) {
      notification.error({ message: "Please fill in all fields." });
      return;
    }

    const bookingDetails = {
      tableId: selectedpeople,
      date: bookingDate.format("YYYY-MM-DD"),
      time: bookingTime.format("HH:mm"),
      guestName,
      guestPhone,
      specialRequest,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/bookings/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingDetails),
        }
      );

      console.log("response", response);

      const data = await response.json();
      if (response.ok) {
        resetData();
        notification.success({ message: "Table booked successfully!" });
        navigate("/bookingsuccess", { state: bookingDetails });
      } else {
        notification.error({ message: data.message || "Error booking table." });
      }
    } catch (error) {
      console.error("Error booking table:", error);
      notification.error({ message: "Error booking table." });
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/bookings/all"
        );
        console.log("response ---", response);
        const data = await response.json();
        if (response.ok) {
          console.log("Bookings:", data);
        } else {
          notification.error({ message: "Error fetching bookings." });
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage:
          "url('https://t3.ftcdn.net/jpg/07/54/93/70/360_F_754937013_Tvqma7ELVFvzdXAqJqzcxI90gpwIoD4l.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {isAuthenticated && <Navbar />}
      <div className="flex justify-center items-center mt-20 p-6">
        <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 font-fancy">
            Book a Table
          </h2>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guest Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="number"
              maxLength={10}
              className="w-full border border-gray-300 rounded-lg p-2"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              placeholder="Number"
            />
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <DatePicker
              disabledDate={disabledDate}
              className="w-full border border-gray-300 rounded-lg p-2"
              value={bookingDate}
              onChange={(date) => setBookingDate(date)}
              placeholder="Pick a Date"
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
              placeholder="Pick a Time"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Number of People
            </label>
            <div className="flex gap-3 flex-wrap">
              <input
                type="number"
                maxLength={1}
                className="w-full border border-gray-300 rounded-lg p-2"
                value={selectedpeople}
                onChange={(e) => setSelectedPeople(e.target.value)}
                placeholder="Number of People"
              />
            </div>
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
              placeholder="Special Requirements..!"
            ></textarea>
          </div>
          <button
            className="w-full bg-[#FF8C00] text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition mt-6"
            onClick={handleSubmit}
            disabled={
              !bookingDate ||
              !bookingTime ||
              !guestName ||
              !guestPhone ||
              !selectedpeople
            }
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

//Code commented

// const handleSubmit = async () => {
//   if (
//     !bookingDate ||
//     !bookingTime ||
//     !guestName ||
//     !guestPhone ||
//     !selectedpeople
//   ) {
//     notification.error({
//       message: "Please fill in all fields.",
//     });
//     return;
//   }

//   const bookingDetails = {
//     tableId: selectedpeople,
//     date: bookingDate.format("YYYY-MM-DD"),
//     time: bookingTime.format("HH:mm"),
//     guestName,
//     guestPhone,
//     specialRequest,
//   };

//   resetData();
//   navigate("/bookingsuccess", { state: bookingDetails });

//   console.log("Booking details:", bookingDetails);
//   notification.success({
//     message: "Table booked successfully!",
//   });
// };
