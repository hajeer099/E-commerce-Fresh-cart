import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext(null);

import React from "react";
import toast from "react-hot-toast";

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const[disabledBtn,setDisabledBtn] =useState(false)

  async function getLoggedUserCart() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      // console.log("data", data);
      setCart(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function AddProductToCart(productId) {
    let LoadingToast = toast.loading("Adding product to cart...");
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
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
      setCart(data);
      toast.success("Product added successfully to your cart");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      toast.dismiss(LoadingToast);
    }
  }

  async function removeCartItem(CartItem) {
    let LoadingToast = toast.loading("Delete Your Product...");
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${CartItem}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("data", data);
      setCart(data);
      toast.success("Product remove successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      toast.dismiss(LoadingToast);
    }
  }

  async function ClearCart() {
    let LoadingToast = toast.loading("Clear Your Product...");
    try {
      let { data } = await axios.delete(
     'https://ecommerce.routemisr.com/api/v1/cart',
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      // console.log("data", data);
      setCart(data);
      toast.success("Clear All Products successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      toast.dismiss(LoadingToast);
    }
  }

   async function UpdateCartItem(CartItemId ,count) {
    console.log('CartItemId' ,CartItemId);
    console.log('count' ,count);
    
    
    let LoadingToast = toast.loading("waiting...");
    setDisabledBtn(true)
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${CartItemId}`,
        {
          count,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("data", data);
      setCart(data);
      toast.success(`We now have ${count} ${count === 1 ? "piece" : "pieces"} in the cart.`);
    // toast.success(' update ');
    } catch (err) {
      console.log('error',err);
      toast.error(err.response.data.message);
    } finally {
      toast.dismiss(LoadingToast);
      setDisabledBtn(false)
    }
  }

  



  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        disabledBtn,
         UpdateCartItem,
        ClearCart,
        removeCartItem,
        loading,
        cart,
        AddProductToCart,
        getLoggedUserCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
