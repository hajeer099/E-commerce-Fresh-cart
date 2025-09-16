import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let wishListContext = createContext(null);

import React from "react";
import toast from "react-hot-toast";

export default function WishListContextProvider({ children }) {
  let [wishList, setWishList] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getLoggedUserWishList() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("dataa", data);
      setWishList(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function AddProductToWishList(productId) {
    let LoadingToast = toast.loading("Adding product to wishList...");
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      // console.log("data", data);
      setWishList(data);
      toast.success("Product added successfully to your wishList");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      toast.dismiss(LoadingToast);
    }
  }

  async function removeProductFromWishList(wishListItem) {
    let LoadingToast = toast.loading("Delete Your WishList...");
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${wishListItem}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("data", data);
      setWishList(data);
      toast.success("WishList remove successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      toast.dismiss(LoadingToast);
    }
  }

  async function ClearWishList() {
    if (!wishList?.data) return;

    let toastId = toast.loading("Clearing your wish list...");

    try {
      
      await Promise.all(
        wishList.data.map((item) => removeProductFromWishList(item._id))
      );

      toast.success("All products removed from wish list!");
      getLoggedUserWishList(); // لإعادة تحميل الويش ليست بعد الحذف
    } catch (err) {
      console.error("Error clearing wishlist:", err);
      toast.error("Failed to clear wishlist.");
    } finally {
      toast.dismiss(toastId);
    }
  }

  

  useEffect(() => {
    getLoggedUserWishList();
  }, []);

  return (
    <wishListContext.Provider
      value={{
        wishList,
        AddProductToWishList,
        getLoggedUserWishList,
        loading,
        removeProductFromWishList,
        ClearWishList,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
}
