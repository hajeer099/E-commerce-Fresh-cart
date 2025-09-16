import axios from "axios";
import { ArrowLeft, ArrowUp } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { scrollToTopBtn } from "../../Context/ScrollToTopBtnContext";

export default function Orders() {
  // const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");
  let navigate = useNavigate();

let scrollToTop = useContext(scrollToTopBtn);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  var { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => {
      return axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
    },
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return isLoading ? (
    <Loading />
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="p-6 md:p-12 mt-10 bg-white text-green-800 font-sans max-w-5xl mx-auto dark:bg-slate-700"
    >
      {data?.data.map((order, orderIndex) => (
        <motion.div
          key={order._id}
          className="bg-white shadow-lg rounded-xl p-6 my-4 border dark:bg-slate-700"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex justify-between items-center border-b p-5 mb-5 bg-mainlight dark:bg-slate-600 ">
            <p className="text-darkPrimary font-bold">
              Transaction Number :{" "}
              <span className="text-primary font-semibold">#{order.id}</span>
            </p>
            <p className="text-darkPrimary font-bold">
              Placed on :{" "}
              <span className="text-primary font-semibold">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </p>
            <p className="text-darkPrimary font-bold">
              Payment :{" "}
              <span className="text-primary font-semibold">
                {order.paymentMethodType}
              </span>
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-primary text-white text-sm px-3 py-1 rounded hover:bg-darkPrimary cursor-pointer "
            >
              Add New Items
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 mb-4">
            {order.cartItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="w-30 h-30 object-cover rounded-xl"
                />
                <div>
                  <p className="font-bold text-primary">{item.product.title}</p>
                  <p className="text-darkPrimary font-bold">
                    Price :{" "}
                    <span className="text-primary font-semibold">
                      EGP {item.price}
                    </span>
                  </p>
                  <p className="text-darkPrimary font-bold">
                    Quantity :{" "}
                    <span className="text-primary font-semibold">
                      {item.count}
                    </span>
                  </p>
                  <p className="text-darkPrimary font-bold">
                    Category:{" "}
                    <span className="text-primary font-semibold">
                      {item.product.category?.name}
                    </span>
                  </p>
                  <p className="text-darkPrimary font-bold">
                    Brand:{" "}
                    <span className="text-primary font-semibold">
                      {item.product.brand?.name}
                    </span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-darkPrimary font-bold text-sm space-y-1 mb-4"
          >
            <p>
              Products Quantity :{" "}
              <span className="text-primary font-semibold">
                {order.cartItems.length}
              </span>
            </p>
            <p>
              Shipping Price :{" "}
              <span className="text-primary font-semibold">
                EGP {order.shippingPrice}
              </span>
            </p>
            <p>
              Taxes :{" "}
              <span className="text-primary font-semibold">
                EGP {order.taxPrice}
              </span>
            </p>
            <p className="font-bold text-lg text-darkPrimary">
              Total Order Price :{" "}
              <span className="text-primary font-semibold">
                EGP {order.totalOrderPrice}
              </span>
            </p>
          </motion.div>
        </motion.div>
      ))}
      {showBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-5 z-50 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-darkPrimary transition"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </motion.div>
  );
}
