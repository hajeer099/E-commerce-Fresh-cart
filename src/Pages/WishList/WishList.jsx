import React, { useContext, useEffect } from "react";
import { wishListContext } from "../../Context/WishListContext";
import WishListItem from "../../Components/WishListItem/WishListItem";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function WishList() {
  let { wishList, getLoggedUserWishList,loading ,ClearWishList } = useContext(wishListContext);
  let Navigate = useNavigate();

  useEffect(() => {
    getLoggedUserWishList();
  }, []);

if(loading){
    return(<div className="flex flex-col border-gray-200 border-b-2 p-5 mt-30 mb-4 md:flex-row md:items-center md:justify-between gap-4 animate-pulse">
      {/* Left Side */}
      <div className="flex gap-5 items-center">
        <div className="w-36 h-36 bg-gray-300 rounded-xl" />

        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded w-40" />
          <div className="h-4 bg-gray-300 rounded w-32" />
          <div className="h-4 bg-gray-300 rounded w-28" />
          <div className="h-4 bg-gray-300 rounded w-24" />
          <div className="h-4 bg-gray-300 rounded w-20" />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5 justify-between w-full md:w-auto">
        <div className="bg-gray-300 rounded-full w-28 h-10" />
        <div className="bg-gray-300 rounded-full w-10 h-10" />
      </div>
    </div>)
}

const handleClear = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to clear this product from your wishlist ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        ClearWishList() ;
      }
    });
  };

  return (
    <div>
      <div>
        <div className="min-h-full bg-mainlight mt-25 w-[90%] m-auto shadow rounded-lg dark:bg-slate-700">
          <div className="flex justify-start items-center gap-2 pt-8 ps-10 ">
            {/*  undo */}
            <button
              className="bg-primary text-white mr-5 p-2 rounded-full text-xl cursor-pointer hover:-translate-x-2.5 transition-all"
              onClick={() => Navigate("/")}
            >
              <ArrowLeft />
            </button>

            <h1 className="text-2xl text-darkPrimary  font-bold">
              Favorite Products
            </h1>
            <i class="fa-brands fa-gratipay text-xl text-primary"></i>
          </div>

          <div>
            <div className="m-auto max-w-5xl justify-center px-6 md:flex flex-col md:space-x-6 xl:px-0 mt-10">
              {wishList?.data?.length > 0 ? (
                <>
                  
                  {wishList?.data?.map((item) => (
                    <WishListItem key={item._id} item={item} />
                  ))}

                  
                  <div className="flex justify-center group mb-4">
                    <button
                      onClick={handleClear }
                      className="bg-red-700 mr-16 cursor-pointer text-white rounded-full p-3 flex items-center gap-2 text-md transition-all"
                    >
                      <i className="icon-wiggle-hover">
                        <Trash2 size={18} />
                      </i>
                      Clear All Products
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-10 flex justify-center items-center flex-col">
                  <p className="text-darkPrimary mb-2">
                    There are not products yet.
                  </p>
                  <button
                    onClick={() => Navigate("/products")}
                    className="bg-primary text-white p-3 rounded-lg txt-xl"
                  >
                    Add Your First Product To Favorite
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
