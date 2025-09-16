import React from "react";
import homeSlider1 from "../../assets/product1.jpg";
import homeSlider2 from "../../assets/02-lestrange.webp";
import homeSlider3 from "../../assets/Fast+fashion,+nina+gbor,+secondhand+clothing+to+africa.webp";
import homeSlider4 from "../../assets/Rail-Pic.jpg";
import homeSlider5 from "../../assets/product4-CxeAzYXu.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


export default function HomeSlider() {

    
  return (
    <div className="grid grid-cols-12 mt-5">
      <div className="col-span-8 relative">
        <Swiper className="h-full" slidesPerView={1} loop={true}>
            
          <SwiperSlide>
            <img src={homeSlider1} alt="" className="h-full w-full object-cover " />
            <div className="container flex  items-start flex-col absolute top-3 left-4">
              <div className="flex justify-center items-center gap-2 bg-white px-4 py-3 rounded-full">
                <i class="fa-brands fa-opencart text-primary text-3xl mr-1"></i>
                <h1 className="text-2xl text-darkPrimary  font-Allura font-bold">
                  Fresh Cart
                </h1>
              </div>
              <p class="text-sm Ubuntu text-white font-semibold max-w-xl m-4 shadow-inner  bg-white/10 p-5 rounded-lg">
                Whether you’re looking for the freshest produce, pantry staples,
                or specialty items, FreshCart brings the supermarket to you,
                redefining the way you shop for groceries.
              </p>
              <button className="bg-primary text-white px-8 py-2 rounded-full ">
                Get Started
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src={homeSlider2} alt="" className="h-full  object-cover " />
          </SwiperSlide>
          <SwiperSlide>
            <img src={homeSlider3} alt="" className="h-full  object-cover " />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="col-span-4 ">
        <Swiper>
          <img src={homeSlider5} 
          alt="" 
          className="h-full  object-cover" />

          <img
            src={homeSlider4}
            alt=""
            className="h-full w-full object-cover"
          />
        </Swiper>
      </div>
    </div>
  );
}
