import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { ArrowLeft, ArrowUp, Search, SlidersHorizontal, X } from "lucide-react";
import image1 from "../../assets/error.svg";
import image2 from "../../assets/no-product-found-DncxVh9z.png";
import image from "../../assets/filter-Bmu1_gjf.png";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useGetApis from "../../Hooks/useGetApis";
import { scrollToTopBtn } from "../../Context/ScrollToTopBtnContext";

export default function Products() {
  
  const [search, setSearch] = useState("");

  const [isFilterOpen, setIsFilterOpen] = useState(false); 

 

  const navigate = useNavigate();

 

  let [page, setPage] = useState(1);

  const [minPrice, setMinPrice] = useState(0);

  let scrollToTop = useContext(scrollToTopBtn);
   const [showBtn, setShowBtn] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowBtn(window.scrollY > 300);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  


  var { data, isLoading, isFetching, isError, error } =useGetApis('products',page)

  const products = data?.data?.data || [];
  const filteredProducts = products
    .filter((product) => product.price >= minPrice)
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <>
      <div className="bg-mainlight dark:bg-slate-600  container m-auto fixed top-0 z-40 right-23 text-center pt-28 p-5 rounded-4xl flex justify-between items-center">
        {/* undo  */}
        <button
          className="bg-primary text-white mr-5 p-2 rounded-full text-xl cursor-pointer hover:-translate-x-2.5 transition-all"
          onClick={() => navigate("/categories")}
        >
          <ArrowLeft />
        </button>

        {/*  search */}
        <div className="flex justify-between items-center relative w-[20%]">
          <input
            value={search}
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white py-1 rounded-full border border-gray-400 focus:outline focus:outline-primary px-3 w-full text-darkPrimary"
          />
          <Search size={18} className="absolute right-3 text-gray-400" />
        </div>

        {/*  filter */}
        <button onClick={() => setIsFilterOpen((prev) => !prev)}>
          <SlidersHorizontal className="text-gray-500 cursor-pointer dark:text-gray-200" />
        </button>
      </div>

      {isFilterOpen && (
        <div
          className={`fixed top-0  left-0 w-72 h-full bg-white z-[99999] rounded-r-3xl shadow-lg p-5 transition-transform duration-300 ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl text-darkPrimary border-b border-gray-800">
              SORT
            </h2>
            <X
              size={20}
              strokeWidth={3}
              className="cursor-pointer text-primary hover:border hover:border-primary  hover:rounded-full transition-all "
              onClick={() => setIsFilterOpen(false)}
            />
          </div>

          <div>
            <label className="block font-semibold text-md  text-darkPrimary text-left">
              Price :
            </label>

            <div
              class="cursor-pointer flex gap-2 items-center text-darkPrimary"
              for="priceSmaller"
            >
              <span>smaller to Bigger</span>
              <span class="size-3 rounded-full p-[6px] flex justify-center items-center border border-primary ">
                <span class="size-1 rounded-full p-[3px] inline-block bg-primary"></span>
              </span>
            </div>

            <div
              class="cursor-pointer flex gap-2 items-center text-darkPrimary"
              for="priceSmaller"
            >
              <span>Bigger to smaller</span>
              <span class="size-3 rounded-full p-[6px] flex justify-center items-center border border-primary ">
                {/* <span class="size-1 rounded-full p-[3px] inline-block bg-primary"></span> */}
              </span>
            </div>
          </div>

          {/*  filter  */}
          <div className="space-y-3">
            <div>
              <h2 className="w-[65px] font-bold text-xl text-darkPrimary  mt-5  border-b  border-gray-800">
                FILTER
              </h2>
            </div>

            <div>
              <label className="block font-semibold text-md mb-1 text-darkPrimary text-left">
                Price Range :
              </label>
              <input
                type="range"
                min="0"
                max="50000"
                className="w-[50%] block appearance-none bg-transparent
    [&::-webkit-slider-runnable-track]:bg-gray-200
    [&::-webkit-slider-runnable-track]:rounded-full
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:bg-primary
    [&::-webkit-slider-thumb]:w-4
    [&::-webkit-slider-thumb]:h-4
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <p className="text-sm text-darkPrimary mt-1 text-left">
                Max Salary now is
                <span className="text-md">(EGP 50,000)</span>
              </p>
            </div>

            <div>
              <label className="block font-semibold text-md mb-1 text-darkPrimary text-left">
                Categories
              </label>
              <div className="flex flex-col gap-1 text-sm text-left text-darkPrimary">
                <label>
                  <input type="checkbox" /> Women's Fashion
                </label>
                <label>
                  <input type="checkbox" /> Men's Fashion
                </label>
                <label>
                  <input type="checkbox" /> Electronics
                </label>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-md mb-1 text-darkPrimary text-left">
                Brands
              </label>
              <div className="flex flex-col gap-1 text-sm text-left text-darkPrimary">
                <label>
                  <input type="checkbox" /> Canon
                </label>
                <label>
                  <input type="checkbox" /> Dell
                </label>
                <label>
                  <input type="checkbox" /> DeFacto
                </label>
                <label>
                  <input type="checkbox" /> Puma
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-[90%] m-auto mt-48 mb-20  ">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <img src={image1} alt="" className="m-auto" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((item,index) => (
                <motion.div
                
                  key={item._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.3,
                    ease: "easeOut",
                  }}
                >
                  <ProductCard item={item} key={item._id} />
                </motion.div>
               
              ))
            ) : (
              <div className="flex justify-center items-center m-auto size-max">
                <img src={image2} alt="" />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 my-6">
        {[...Array(data?.data?.metadata?.numberOfPages)].map((item, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className="bg-darkPrimary text-white px-3 py-1 rounded hover:bg-primary transition"
          >
            {index + 1}
          </button>
        ))}
      </div>
       {showBtn && (
  <button
    onClick={scrollToTop}
    className="fixed bottom-20 right-5 z-50 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-darkPrimary transition"
  >
    <ArrowUp size={24} />
  </button>
)}
    </>
  );
}
