import React, { useContext, useEffect } from "react";
import { cartContext } from "../../Context/CartContext";
import CartItem from "../../Components/CartItem/CartItem";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import CheckOut from "../../Components/CheckOut/CheckOut";

export default function Cart() {
  let { cart, getLoggedUserCart, loading, ClearCart } = useContext(cartContext);
  const Navigate = useNavigate();

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col  border-gray-300 border-b-2 mt-16 p-5 mb-4 md:flex-row md:items-center md:justify-between gap-4 animate-pulse">
        <div className="flex gap-5 justify-center items-center">
          <div className="w-36 h-36 bg-gray-300 rounded-3xl" />
          <div className="flex flex-col gap-2">
            <div className="w-40 h-4 bg-gray-300 rounded"></div>
            <div className="w-32 h-3 bg-gray-300 rounded"></div>
            <div className="w-32 h-3 bg-gray-300 rounded"></div>
            <div className="w-24 h-3 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-1/2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  const handleClear = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to clear your cart ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        ClearCart();
      }
    });
  };

  return (
    <div>
      <div>
        <div className="min-h-full bg-mainlight mt-25 w-[90%] m-auto shadow rounded-lg dark:bg-slate-700 ">
          <div className="flex justify-start items-center gap-2 pt-8 ps-10 ">
            {/*  undo */}
            <button
              className="bg-primary text-white mr-5 p-2 rounded-full text-xl cursor-pointer hover:-translate-x-2.5 transition-all"
              onClick={() => Navigate("/")}
            >
              <ArrowLeft />
            </button>

            <h1 className="text-2xl text-darkPrimary  font-bold">Shop Cart</h1>
            <i class="fa-brands fa-opencart text-primary text-2xl mr-1"></i>
          </div>

          <div>
            <div className="m-auto max-w-5xl justify-center px-6 md:flex flex-col md:space-x-6 xl:px-0 mt-10">
              {cart?.data?.products?.length > 0 ? (
                <>
                  {/*product*/}
                  {cart?.data?.products.map((item) => (
                    <CartItem key={item._id} item={item} />
                  ))}
                  {/*  Clear All */}
                  <div className="flex justify-end group mb-4 ">
                    <button
                      onClick={handleClear}
                      className="bg-red-700 mr-16 cursor-pointer text-white rounded-lg p-2 flex items-center gap-2 text-md transition-all"
                    >
                      <i className="icon-wiggle-hover ">
                        <Trash2 size={18} />
                      </i>
                      Clear All Products
                    </button>
                  </div>
                    <CheckOut totalPrice={cart?.data?.totalCartPrice}/>
                </>
              ) : (
                <div className="mb-10 flex justify-center items-center flex-col">
                  <p className="text-darkPrimary mb-2">
                    There are not items yet.
                  </p>
                  <button
                    onClick={() => Navigate("/products")}
                    className="bg-primary text-white p-3 rounded-lg txt-xl"
                  >
                    Add Your First Product To Cart
                  </button>
                </div>
              )}
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}
