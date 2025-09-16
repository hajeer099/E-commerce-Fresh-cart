import { Trash2, X } from "lucide-react";
import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";
import Swal from "sweetalert2";

export default function WishListItem({ item }) {
  // console.log('item' ,item);
 let{AddProductToCart }= useContext(cartContext)
 let{removeProductFromWishList}=useContext(wishListContext)

 const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this product from your wishlist ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeProductFromWishList(item.id);
      }
    });
  };

  return (
    <div className="flex flex-col border-gray-300 border-b-2 p-5 mb-4 md:flex-row md:items-center md:justify-between gap-4">
      {/* Left: Image */}
      <div className="flex gap-5 justify-center items-center">
        <img
          src={item?.imageCover}
          alt={item?.title}
          className="w-35 h-50 p-1 object-cover rounded-3xl  border-gray-300 border-2"
        />

        {/* Info */}
        <div>
          <h2 className="font-bold text-xl text-darkPrimary">{item?.title}</h2>
          <p className="text-md text-darkPrimary">
            Brand:
            <span className="text-primary text-sm">{item?.brand?.name}</span>
          </p>
          <p className="text-md text-darkPrimary">
            Category:
            <span className="text-primary text-sm">{item?.category?.name}</span>
          </p>
          <p className="text-md text-primary mt-1">Available</p>
          <div className="flex items-center gap-2 text-sm ">
            <span className="text-md text-darkPrimary">Rate :</span>
            <span className="text-yellow text-2xl"> ★</span>
            <span className="text-primary text-md">{item?.ratingsAverage}</span>
          </div>
          <p className=" text-md text-darkPrimary ">
            Price:
            <span className="text-primary text-md">EGP {item.price}</span>
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-10  text-darkPrimary font-bold justify-between  md:justify-between w-full md:w-auto">
        {/* Remove item */}
        <div className="flex justify-end group ">
          <button
              onClick={() => {AddProductToCart(item.id)}}

            className="bg-primary cursor-pointer text-white rounded-full px-6 flex items-center justify-center  gap-1  text-sm font-light transition-all"
          >
            <i class="fa-solid fa-cart-plus hover:-translate-x-1"></i>
            Add To Cart
          </button>

          <button
          onClick={handleDelete}
            className="bg-red-700 ml-5 text-white cursor-pointer rounded-full p-3 flex items-center gap-2 text-sm font-light transition-all"
          >
            <i className="icon-wiggle-hover">
              <Trash2 size={18} />
            </i>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
