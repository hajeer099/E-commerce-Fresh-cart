import React, { useContext, useEffect, useState } from "react";
import Card from "../../Components/Card/Card";
import ProductCard from "../../Components/ProductCard/ProductCard";
import myImage from "../../assets/light-patten.svg";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import CategoryDetails from "../../Components/CategoryDetails/CategoryDetails";

import image1 from "../../assets/error.svg";
import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";
import useGetApis from "../../Hooks/useGetApis";
import { scrollToTopBtn } from "../../Context/ScrollToTopBtnContext";
import { ArrowUp } from "lucide-react";

export default function Home() {
  let [Theme, setTheme] = useState("light");

  let scrollToTop = useContext(scrollToTopBtn);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  let [page, setPage] = useState(1);

  function toggleTheme() {
    if (Theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }



  var { data, isLoading, isFetching, isError, error } = useGetApis(
    "products",
    page
  );

  return (
    <div className={Theme}>
      <div
        style={{ backgroundImage: `url(${myImage})` }}
        className="bg-cover bg-no-repeat min-h-screen mt-20 "
      >
        <div className="container  py-5 ">
          {/* ----- Home Slider-----  */}
          <HomeSlider />

          {/* ----- Category Slider-----  */}

          <CategorySlider />
          {/* <CategoryDetails/> */}

          {/* ----- Products Slider-----  */}

          <motion.h1 className="text-center font-bold text-3xl text-blue mx-auto relative m-12 after:content-[''] after:w-[25%] after:mx-auto after:h-1 after:bg-primary after:block after:mt-2 dark:text-primary">
            {"Shop now by popular products".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.04,
                }}
                className="inline-block "
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          {isLoading ? (
            <Loading />
          ) : error ? (
            <img src={image1} alt="" className=" m-auto" />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {data.data.data.map((item, index) => (
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
                  <ProductCard item={item} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
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
    </div>
  );
}
