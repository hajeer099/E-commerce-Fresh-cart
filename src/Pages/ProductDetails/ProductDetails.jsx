import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Loading from "../../Components/Loading/Loading";
import { ArrowLeft, ArrowUp, Heart } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { cartContext } from "../../Context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useDetailsApi from "../../Hooks/useDetailsApis";
import useDetailsApis from "../../Hooks/useDetailsApis";
import { scrollToTopBtn } from "../../Context/ScrollToTopBtnContext";

export default function ProductDetails() {
  let { id } = useParams();
  
  let { AddProductToCart } = useContext(cartContext);

  const Navigate = useNavigate();

  let scrollToTop = useContext(scrollToTopBtn);
    const [showBtn, setShowBtn] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setShowBtn(window.scrollY > 300);
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);



  var { data, isLoading, isFetching, isError, error } = useDetailsApis("products", id);


  //  categoryId المنتجات المتعلقة
  const categoryId = data?.data?.data?.category?._id;
  var {
    data: relatedProducts,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["productDetails", "RelatedProducts", categoryId],
    queryFn: () =>
      axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
      ),
    
    enabled: !!categoryId,
  });

  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (data?.data?.data?.images?.length) {
      setMainImage(data.data.data.images[0]);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div class="bg-white shadow-lg rounded-lg overflow-hidden relative flex flex-col md:flex-row w-[90%] m-auto mt-10 p-5 animate-pulse">
        <div class="md:w-1/3 p-5 flex flex-col gap-3 relative">
          <div class="w-full max-h-full mx-auto bg-gray-200 h-64"></div>
          <div class="h-4 w-full bg-gray-200 mt-6"></div>
        </div>
        <div class="md:w-1/2 p-6">
          <div class="h-4 w-48 bg-gray-200 mb-2"></div>
          <div class="h-4 w-24 bg-gray-200 mb-3"></div>
          <div class="h-4 w-32 bg-gray-200 mb-1"></div>
          <div class="flex items-center gap-2 mb-2">
            <div class="h-4 w-24 bg-gray-200"></div>
            <div class="h-4 w-16 bg-gray-200"></div>
          </div>
          <div class="h-4 w-40 bg-gray-200 mb-3"></div>
          <div class="flex items-center gap-4 mb-2">
            <div class="h-6 w-24 bg-gray-200"></div>
            <div class="h-6 w-20 bg-gray-200"></div>
            <div class="h-6 w-28 bg-gray-200 ml-70"></div>
          </div>
          <div class="h-4 w-24 bg-gray-200 mb-4"></div>
          <div class="flex gap-3">
            <div class="px-4 py-2 bg-gray-200"></div>
            <div class="px-4 py-2 bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};


  return (
    <>
      
      <div className="bg-white dark:bg-slate-700 shadow-lg rounded-lg overflow-hidden relative flex flex-col  md:flex-row w-[90%] m-auto  mt-20 p-5">
 

      
        {/*  undo */}
        <button
          className="absolute top-4 right-4 bg-primary text-white p-2 rounded-full  text-xl hover:-translate-x-2.5 transition-all cursor-pointer"
          onClick={() => Navigate("/products")}
        >
          <ArrowLeft />
        </button>

        {/* Image */}
        <div className="md:w-1/3 p-5 flex flex-col gap-3 relative">
          <img
            src={mainImage}
            alt="Main"
            className="w-full max-h-full object-contain mx-auto"
          />

          <button className="absolute top-10 right-18 text-red-500 hover:text-red-700 transition-all ">
            <Heart />
          </button>

          <div>
            <Swiper spaceBetween={5} slidesPerView={3}>
              {data?.data.data?.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={`thumb-${idx}`}
                    className={`w-50 h-50 object-contain cursor-pointer border-2 rounded 
          ${mainImage === img ? "border-primary border-4" : "border-none"}
        `}
                    onClick={() => setMainImage(img)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Details */}
        <div className="md:w-1/2 p-6 ">
          <h2 className="text-2xl font-bold text-darkPrimary mb-2">
            {data?.data.data?.title}
          </h2>
          <p className="text-sm text-primary mb-3">
            {data?.data.data?.category.name}
          </p>

          <p className="text-sm text-gray-500 mb-1">
            <span>{data?.data.data?.brand?.name}</span>
            <span className="mx-1"> | </span>
            {data?.data.data?.quantity > 0 ? (
              <span className="text-primary">Available</span>
            ) : (
              <span className="text-orange">Sold Out</span>
            )}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-2 ">
            <span className=" text-yellow px-2 py-1 rounded text-2xl  flex gap-1 justify-between items-center">
              ★<p className="text-primary">{data?.data.data?.ratingsAverage}</p>
            </span>
            <span className="text-sm text-gray-500">
              {data?.data.data?.ratingsQuantity} reviews
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-3">
            {data?.data.data?.description}
          </p>

          {/* Pricing */}
          <div className="flex items-center gap-4 mb-2 ">
            <span className="text-2xl font-bold text-gray-800">
              {data?.data.data?.price}
            </span>
            <span className="line-through text-gray-400">
              ${data?.data.data?.price + 200}
            </span>
            <span className="text-red-500 font-semibold text-sm bg-red-100 p-1 ml-70">
              Save{" "}
              {Math.round(
                ((data?.data.data?.price -
                  data?.data.data?.priceAfterDiscount) /
                  data?.data.data?.price) *
                  100
              )}
              %
            </span>
          </div>

          <p className="text-green-600 text-sm mb-4">Free Delivery</p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-darkPrimary cursor-pointer transition">
              Buy Now
            </button>
            <button
              onClick={() => AddProductToCart(data?.data.data._id)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div>
        <motion.h1 className="dark:text-primary text-center text-blue font-bold text-3xl mx-auto after:content-[''] relative after:w-[13%] after:mx-auto after:h-1 after:bg-primary m-12 after:top-0 after:right-0 after:left-0 after:bottom-0 after:block after:mt-2 mt-10">
          {"Related Products".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.04,
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 container">
          {relatedProducts?.data?.data?.map((item, index) => (
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
          ))}
        </div>
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
