import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Loading from "../Loading/Loading";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/autoplay';


export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getAllCategories() {
    try {
      setLoading(true);
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      // console.log('noga',data);
      setCategories(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div>
      <h2 className="text-darkPrimary font-bold m-4 text-xl">
        Shope now by popular categories
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 1000 }}
          loop={true}
          spaceBetween={0}
          slidesPerView={6}
          breakpoints={{
   
    0: {
      slidesPerView: 1,
    },
  
    480: {
      slidesPerView: 2,
    },
   
    768: {
      slidesPerView: 3,
    },
   
    1024: {
      slidesPerView: 4,
    },
   
    1280: {
      slidesPerView: 5,
    },
    1536: {
      slidesPerView: 6,
    },
  }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <Link to={`/category/${category._id}`}>
                <div className="text-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-64 w-full object-cover"
                  />
                  <h2 className="m-0 text-darkPrimary font-semibold bg-gray-100 p-1">
                    {category.name}
                  </h2>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
