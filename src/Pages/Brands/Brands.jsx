import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useGetApis from "../../Hooks/useGetApis";
import { scrollToTopBtn } from "../../Context/ScrollToTopBtnContext";
import { ArrowUp } from "lucide-react";

export default function Brands() {


  var { data, isLoading, isFetching, isError, error } = useGetApis("brands");

  let scrollToTop = useContext(scrollToTopBtn);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mt-24 px-5">
      {/* <h2 className="text-primary border-b border-t border-gray-200 p-2 text-center font-bold m-4 text-xl">
        Shop by Brands
      </h2> */}

      <motion.h1 className="text-primary border-b border-t border-gray-200 p-2 text-center font-bold m-4 text-xl">
        {"Shop by Brands".split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.04,
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-600 text-center">Failed to load brands 😞</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-9  container">
          {data.data.data.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <Link to={`/brands/${item._id}`}>
                <div className="bg-white rounded-full  shadow-md hover:shadow-lg transition duration-300 p-9 flex flex-col items-center justify-center hover:scale-110">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-15 object-contain mb-3 "
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
      {showBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-5 z-50 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-darkPrimary transition"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}
