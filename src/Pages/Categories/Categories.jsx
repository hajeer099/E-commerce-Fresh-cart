import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useGetApis from "../../Hooks/useGetApis";

export default function CategorySlider() {
  
   var { data, isLoading, isFetching, isError, error } =useGetApis('categories')




  return (
    <div className="w-[90%] mx-auto mt-24">
    

      <motion.h1 className="text-primary border-b border-t border-gray-200 p-2 text-center font-bold m-4 text-xl">
        {"Shop now by popular categories".split("").map((char, index) => (
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
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 px-5">
          {data.data.data.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <Link to={`/category/${category._id}`} key={category._id}>
                <div className="relative rounded-xl shadow-md overflow-hidden mt-5 hover:scale-105 transition-transform duration-300">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-40 object-cover"
                  />

                  {/* <span className="absolute top-2 left-1/2 -translate-x-1/2 bg-red-600/90 text-white text-sm px-2 py-1 rounded-md font-bold">
                  OUT OFF STOCK
                </span> */}

                  <h2 className="text-center text-green-900 font-semibold py-2 bg-gray-50">
                    {category.name}
                  </h2>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
