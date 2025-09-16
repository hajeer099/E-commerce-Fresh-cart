import axios from "axios";
import { ArrowLeft, Eye, Heart, ShoppingCart } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import image2 from "../../assets/no-product-found-DncxVh9z.png";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";
import { useQuery } from "@tanstack/react-query";
import useDetailsApi from "../../Hooks/useDetailsApis";
import useDetailsApis from "../../Hooks/useDetailsApis";

export default function BrandsDetails({ item }) {
  // const [detailsbrands, setDetailsbrands] = useState(null);
  // let [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  let { AddProductToCart } = useContext(cartContext);
  let { AddProductToWishList } = useContext(wishListContext);



const { data, isLoading, isFetching, isError, error } = useDetailsApis("products", id, "query");


  const hasDiscount =
    item?.priceAfterDiscount && item?.priceAfterDiscount < item?.price; //نسبه الخصم -->sale
  const discount = hasDiscount
    ? Math.round(((item?.price - item?.priceAfterDiscount) / item?.price) * 100)
    : 0;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden relative  flex flex-col  md:flex-row w-[90%] m-auto  mt-28 p-5 dark:bg-slate-700">
      {/* undo */}
      <button
        className="absolute top-4 left-4 bg-primary text-white p-2 rounded-full  text-xl hover:-translate-x-2.5 transition-all cursor-pointer"
        onClick={() => navigate("/brands")}
      >
        <ArrowLeft />
      </button>

      {isLoading ? (
        <div className="m-auto  w-full">
          <Loading />
        </div>
      ) : data?.data.data.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-14">
          {data?.data.data.map((item) => (
            <div key={item._id}>
              {/* product cart */}
              <div className="bg-white  dark:bg-slate-700 rounded-lg shadow hover:shadow-lg overflow-hidden relative group transition-all duration-300">
                <div className="relative overflow-hidden  px-2">
                  {item.priceAfterDiscount &&
                    item.priceAfterDiscount < item.price && (
                      <span className="absolute top-0 left-0 bg-darkPrimary rounded-tr-[50%] rounded-br-[50%] rounded-bl-[50%] text-yellow  px-3 py-2 shadow-lg z-10  text-sm">
                        -
                        {Math.round(
                          ((item.price - item.priceAfterDiscount) /
                            item.price) *
                            100
                        )}
                        %<p className=" font-bold text-primary">Sale</p>
                      </span>
                    )}
                  <img
                    src={item.imageCover}
                    alt={item.title}
                    className="w-full h-[280px] object-contain"
                  />
                  <div className="absolute inset-0  bg-opacity-30 flex justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex gap-3 mb-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <Link
                        onClick={() => {
                          AddProductToWishList(item.id);
                        }}
                        className="bg-primary hover:bg-darkPrimary p-2 rounded-full text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100 cursor-pointer"
                      >
                        <Heart size={20} />
                      </Link>
                      <Link
                        onClick={() => {
                          AddProductToCart(item._id);
                        }}
                        className="bg-primary hover:bg-darkPrimary p-2 rounded-full text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-230 cursor-pointer"
                      >
                        <ShoppingCart size={20} />
                      </Link>
                      <Link
                        to={`/productsDetails/${item._id}`}
                        className="bg-primary hover:bg-darkPrimary p-2 rounded-full text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-340 cursor-pointer"
                      >
                        <Eye size={20} />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-sm text-primary hover:text-orange transition-all mb-1">
                    {item.title.split(" ").slice(0, 4).join(" ")}
                  </h3>

                  <h4 className="text-sm font-semibold text-darkPrimary mb-1">
                    {item.category.name}
                  </h4>
                  <p className="text-sm text-gray-500 mb-1">
                    <span>{item.brand.name}</span>
                    <span className="mx-1"> | </span>
                    {item.quantity > 0 ? (
                      <span className="text-primary">Available</span>
                    ) : (
                      <span className="text-orange">Sold Out</span>
                    )}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary ">EGP {item.price} </span>
                    <span className="flex items-center gap-1 text-yellow-500 text-xl">
                      ★<p className="text-darkPrimary">{item.ratingsAverage}</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center m-auto size-max">
          <img src={image2} alt="" />
        </div>
      )}
    </div>
  );
}
