import React, { useContext, useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { cartContext } from "../../Context/CartContext";
import Swal from "sweetalert2";

export default function CartItem({ item }) {
  // console.log("item", item);

  const [loading, setLoading] = useState(false);
  let { removeCartItem , UpdateCartItem,disabledBtn } = useContext(cartContext);
let[count , setCount]= useState(item?.count)

function update(){
  if(count==item?.count){
    return
  }
  UpdateCartItem(item?.product?._id,count);
}

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCartItem(item.product._id);
      }
    });
  };

  useEffect(()=>{
    setCount(item?.count)
  },[item?.count])
 

  return (
    <div className="flex flex-col dark:bg-slate-600  border-gray-300 border-b-2 p-5 mb-4 md:flex-row md:items-center md:justify-between gap-4">
      {/* Left: Image */}
      <div className="flex gap-5 justify-center items-center">
        <img
          src={item.product.imageCover}
          alt={item.product.title}
          className="w-35 h-50 p-1 object-cover rounded-3xl  border-gray-300 border-2"
        />

        {/* Info */}
        <div>
          <h2 className="font-bold text-xl text-darkPrimary">
            {item.product.title}
          </h2>
          <p className="text-md text-darkPrimary">
            Brand:
            <span className="text-primary text-sm">
              {item?.product?.brand?.name}
            </span>
          </p>
          <p className="text-md text-darkPrimary">
            Category:
            <span className="text-primary text-sm">
              {item?.product?.category?.name}
            </span>
          </p>
          <p className="text-md text-primary mt-1">Available</p>
          <div className="flex items-center gap-2 text-sm ">
            <span className="text-md text-darkPrimary">Rate :</span>
            <span className="text-yellow text-2xl"> ★</span>
            <span className="text-primary text-md">
              {item.product.ratingsAverage}
            </span>
          </div>
          <p className=" text-md text-darkPrimary ">
            Price:
            <span className="text-primary text-md">EGP {item.price}</span>
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-10  text-darkPrimary font-bold justify-between md:justify-between w-full md:w-auto">
        {/* Quantity controls */}
        <div className="flex items-center border-gray-300 border-2 gap-2 rounded-2xl  overflow-hidden">
          <button
           disabled={disabledBtn}
            onClick={() => {
              UpdateCartItem(item.product._id,item.count- 1);
            }}
            className="disabled:cursor-not-allowed px-4 py-3 text-lg  hover:bg-gray-200"
          >
            <Minus size={16} />
          </button>
          <input 
          type="number"
          value={count}
          onBlur={update}
          min={1}
          onChange={(e)=>{setCount(e.target.value)}}
          className="h-8 w-20 border-0 outline-none focus:border-gray-200 "
          />
          
          <button
           disabled={disabledBtn}
            onClick={() => {
              UpdateCartItem(item.product._id,item.count + 1);
            }}
            className="disabled:cursor-not-allowed px-4 py-3 text-lg  hover:bg-gray-200"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Total price */}
        <div>
          <p className="text-darkPrimary  text-md">Total Price</p>
          <p className="text-sm text-primary">EGP {item.count * item.price}</p>
        </div>

        {/* Remove item */}
        <button
          onClick={handleDelete}
          className="group mr-1 text-red-500 cursor-pointer hover:border-red-600 hover:border-2 hover:rounded-full hover:p-1 transition-all"
        >
          <X
            size={18}
            className="group-hover:rotate-[90deg] text-gray-500 font-bold hover:text-red-600 transition-all "
          />
        </button>
      </div>
    </div>
  );
}
