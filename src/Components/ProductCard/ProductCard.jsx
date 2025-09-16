import { Heart, ShoppingCart, Eye } from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";
import { motion } from "framer-motion";

export default function ProductCard({ item }) {
  let { AddProductToCart } = useContext(cartContext);
  let { AddProductToWishList } = useContext(wishListContext);

  const hasDiscount =
    item.priceAfterDiscount && item.priceAfterDiscount < item.price; 
  const discount = hasDiscount
    ? Math.round(((item.price - item.priceAfterDiscount) / item.price) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        rotate: 0,
        boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white p-4 rounded-xl cursor-pointer dark:bg-slate-700 "
    >
      <div className="bg-white dark:bg-slate-700  rounded-lg shadow hover:shadow-lg overflow-hidden relative group transition-all duration-300">
        {/* Image */}
        <div className="relative overflow-hidden  px-2">
          {/* Sale Badge */}
          {discount > 0 && (
            <span className="absolute top-0 left-0 bg-darkPrimary rounded-tr-[50%] rounded-br-[50%] rounded-bl-[50%] text-yellow  px-3 py-2 shadow-lg z-10  text-sm">
              -{discount}%<p className=" font-bold text-primary">Sale</p>
            </span>
          )}
          <img
            src={item.imageCover}
            alt={item.title}
            className="w-full h-[280px]  "
          />

          {/* Hover Icons */}
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

        {/* Info */}
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
    </motion.div>
  );
}
