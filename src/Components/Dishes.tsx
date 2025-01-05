import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { fetcher } from "../services/axiosInstance";
import useSWR from "swr";
import { Modal, Button } from "antd";

export const Dishes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Starters");
  const [selectedSubcategory, setSelectedSubcategory] = useState("Veg"); // New state for subcategories
  const [cart, setCart] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const { data: response, error } = useSWR(
    isAuthenticated ? "http://localhost:9090/api/v1/food/getAll" : null,
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false }
  );

  // const filteredDishes =
  //   response?.foods?.filter((dish: any) => {
  //     if (selectedCategory === "Starters" || selectedCategory === "Rice") {
  //       return (
  //         dish.category === selectedCategory &&
  //         dish.subcategory === selectedSubcategory
  //       );
  //     }
  //     return dish.category === selectedCategory;
  //   }) || [];

  const filteredDishes =
    response?.foods?.filter(
      (dish: any) => dish.category === selectedCategory
    ) || [];

  const handleIncrement = (_id: any) => {
    setCart((prev: any) => {
      const existing = prev.find((item: any) => item._id === _id);
      if (existing) {
        return prev.map((item: any) =>
          item._id === _id ? { ...item, count: item.count + 1 } : item
        );
      }
      const dish = filteredDishes.find((item: any) => item._id === _id);
      return [...prev, { ...dish, count: 1 }];
    });
  };

  const handleDecrement = (_id: any) => {
    setCart((prev: any) => {
      const existing = prev.find((item: any) => item._id === _id);
      if (existing && existing.count > 1) {
        return prev.map((item: any) =>
          item._id === _id ? { ...item, count: item.count - 1 } : item
        );
      } else if (existing && existing.count === 1) {
        return prev.filter((item: any) => item._id !== _id);
      }
      return prev;
    });
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (sum: any, item: any) => sum + item.price * item.count,
      0
    );
  };

  const openCartModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-[80px] w-full">
      {isAuthenticated && <Navbar />}
      <div className="mt-2">
        <div className="flex justify-center gap-4 p-4">
          {[
            "Starters",
            "Veg",
            "Non Veg",
            "Dessert",
            "Mocktail",
            "Main Course",
          ].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 font-medium rounded ${
                selectedCategory === category
                  ? "bg-[#FF8C00] text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-[#FF8C40]"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish: any) => (
              <div
                key={dish._id}
                className="bg-white p-4 shadow-md rounded-lg flex flex-col justify-between"
              >
                <img
                  src={dish.imageUrl}
                  alt="Please-make-sure-the-image link is correct"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{dish.title}</h3>
                <p className="text-gray-600 mb-4">{dish.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">
                    ₹{dish.price}
                  </span>
                  {/* <div className="flex items-center">
                    <button
                      className="px-2 py-1 bg-gray-300 text-white rounded-l"
                      onClick={() => handleDecrement(dish._id)}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border">
                      {cart.find((item: any) => item._id === dish._id)?.count ||
                        0}
                    </span>
                    <button
                      className="px-2 py-1 bg-gray-200 text-white rounded-r"
                      onClick={() => handleIncrement(dish._id)}
                    >
                      +
                    </button>
                  </div> */}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-700 text-center col-span-full">
              No dishes available in this category.
            </div>
          )}
        </div>

        {/* {isModalOpen ? (
          ""
        ) : (
          <div className="fixed bottom-4 right-4">
            <button
              className="px-4 py-2 bg-[#FF8C00] text-white rounded-lg shadow-md"
              onClick={openCartModal}
            >
              View Cart (₹{getTotalPrice()})
            </button>
          </div>
        )} */}
      </div>

      <Modal
        title="Your Cart"
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
      >
        {cart.length > 0 ? (
          <ul className="space-y-4">
            {cart.map((item: any) => (
              <li key={item._id} className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold">{item.title}</h4>
                  <p className="text-gray-600">
                    ₹{item.price} x {item.count}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    className="px-2 py-1 bg-gray-300 text-white rounded-l"
                    onClick={() => handleDecrement(item._id)}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border">{item.count}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 text-white rounded-r"
                    onClick={() => handleIncrement(item._id)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
            <div className="flex justify-end w-full">
              <span className="w-full flex justify-end border p-2 rounded-xl bg-[#FF8C00] text-white">
                Total - ₹ {getTotalPrice()}
              </span>
            </div>
          </ul>
        ) : (
          <p>No items in the cart.</p>
        )}
      </Modal>
    </div>
  );
};
