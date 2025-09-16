import {
  Menu,
  Moon,
  ShoppingCart,
  BaggageClaim,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Sun,
  LogOut,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { authContext } from "../../Context/AuhContext";
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";
import { wishListContext } from "../../Context/WishListContext";

export default function Navbar({ changeTheme, theme }) {
  const [isMobileMenuOpen, setIsMobileMenuOPen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOPen(!isMobileMenuOpen);
  };

  let [count, setCount] = useState();
  let { token, setToken } = useContext(authContext);

  let { cart } = useContext(cartContext);
  let [counter, setCounter] = useState(cart?.numOfCartItems);
  useEffect(() => {
    setCounter(cart?.numOfCartItems);
  }, [cart]);

  let { wishlist } = useContext(wishListContext);
  let [animatewish, setAnimatewish] = useState();
  let [counter2, setCounter2] = useState();
 useEffect(() => {
    if (counter2 > 0) {
      setAnimatewish(true);
      setTimeout(() => {
        setAnimatewish(false);
      }, 300);
    }
  }, [counter2]);
  useEffect(() => {
    setCounter2(wishlist?.data?.length);
  }, [wishlist])

  const logOut = () => {
    const LoadingToast = toast.loading("Logging out...", {
      duration: 2000,
    });

    try {
      localStorage.removeItem("token");
      setToken(null);

      setTimeout(() => {
        toast.dismiss(LoadingToast); 
        toast.success("Logged out ✅");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      toast.dismiss(LoadingToast);
    }
  };

  return (
    <>
      <div className="bg-mainlight dark:bg-slate-800 dark:text-white shadow py-5 fixed top-0 w-full z-50">
        <div className=" flex justify-between items-center container space-x-4 ">
          <div className="flex justify-center items-center gap-2  ">
            <i class="fa-solid fa-cart-plus text-primary text-3xl mr-1"></i>
            <h1 className="text-2xl text-darkPrimary  font-Allura font-bold">
              Fresh Cart
            </h1>

            {/* Links pages*/}
            {token ? (
              <ul className="hidden lg:flex justify-center items-center space-x-4 ">
                <li className="hover:text-primary ml-32">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-bold  "
                        : "hover:text-primary  transition-all text-slate-500 dark:text-white"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className="hover:text-primary">
                  <NavLink
                    to="/products"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-bold  "
                        : "hover:text-primary  transition-all text-slate-500 dark:text-white"
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li className="hover:text-primary">
                  <NavLink
                    to="/categories"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-bold "
                        : "hover:text-primary  transition-all text-slate-500 dark:text-white"
                    }
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="hover:text-primary">
                  <NavLink
                    to="/brands"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-bold "
                        : "hover:text-primary  transition-all text-slate-500 dark:text-white"
                    }
                  >
                    Brands
                  </NavLink>
                </li>
                <li className="hover:text-primary">
                  <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-bold  "
                        : "hover:text-primary  transition-all text-slate-500 dark:text-white"
                    }
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>
            ) : null}
          </div>

          <div className="hidden lg:flex justify-end items-center gap-3 text-xl ">
            <ul className="hidden lg:flex justify-end items-center gap-2 text-xl">
              {token ? (
                <>
                  <li className="relative">
                    <Link to={"/wishList"}>
                      <i className=" fa-solid fa-heart text-xl text-darkPrimary me-2  hover:-translate-y-1 transition-all duration-300 hover:text-primary cursor-pointer"></i>
                    </Link>
                     {wishlist?.data.length > 0 && (
                      <div className="bg-primary size-5 text-center text-white text-sm rounded-full absolute -top-2 -left-3 font-bold">
                        {counter2}
                      </div>
                    )}
                  </li>

                  <li className="relative">
                    <Link to={"/cart"}>
                      <i className="fa-solid fa-cart-shopping fa-md text-darkPrimary me-3 cursor-pointer hover:text-gray-800 transition-all hover:-translate-y-1  duration-300" />
                    </Link>
                    {cart?.numOfCartItems > 0 && (
                      <div className="bg-primary size-5 text-center text-white text-sm rounded-full absolute -top-2 -left-3 font-bold">
                        {cart.numOfCartItems}
                      </div>
                    )}
                  </li>
                </>
              ) : null}

              <li>
                <a
                  target="_blank"
                  href="https://www.facebook.com"
                  rel="noreferrer"
                >
                  <i className="fa-brands fa-facebook text-[#0866ff] hover:-translate-y-1 ml-3 transition duration-300"></i>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.instagram.com"
                  rel="noreferrer"
                >
                  <i className="fa-brands fa-instagram text-[#E1306C] hover:-translate-y-1 transition duration-300"></i>
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.x.com" rel="noreferrer">
                  <i className="fa-brands fa-x-twitter text-darkPrimary hover:-translate-y-1 transition duration-300"></i>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.linkedin.com"
                  rel="noreferrer"
                >
                  <i className="fa-brands fa-linkedin text-[#0077B5] hover:-translate-y-1 transition duration-300"></i>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.youtube.com"
                  rel="noreferrer"
                >
                  <i className="fa-brands fa-youtube text-[#FF0000] hover:-translate-y-1 transition duration-300 me-7"></i>
                </a>
              </li>
            </ul>

            {/*  Auth Links */}
            <ul className="hidden lg:flex justify-between items-center gap-3 text-xl">
              {!token ? (
                <>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive ? "text-primary font-bold " : " text-slate-500"
                      }
                    >
                      LogIn
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        isActive ? "text-primary font-bold " : " text-slate-500"
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="text-lg cursor-pointer" onClick={logOut}>
                  <LogOut className="text-slate-600 text-md dark:text-white m-auto" />
                </li>
              )}

              <li>
                <button onClick={changeTheme} className="btn dark:text-white">
                  {theme === "light" ? (
                    <Moon size={25} className="cursor-pointer text-gray-600" />
                  ) : (
                    <Sun size={25} className="cursor-pointer text-gray-400" />
                  )}
                </button>
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div
            className="btn lg:hidden dark:text-white"
            onClick={toggleMobileMenu}
          >
            <Menu />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-110 opacity-100 " : "max-h-0 opacity-0"
          }`}
        >
          <div className="container px-4 py-6 transition-all duration-300 ease-in-out  text-center ">
            <ul className="space-y-2 text-md text-slate-700 ">
              <li className="nav-link dark:text-white">
                <Link to={"/"}>Home</Link>
              </li>
              <li className="nav-link dark:text-white">
                <Link to={"/products"}>Products</Link>
              </li>
              <li className="nav-link dark:text-white">
                <Link to={"/categories"}>Categories</Link>
              </li>
              <li className="nav-link dark:text-white">
                <Link to={"/brands"}>Brands</Link>
              </li>
              <li className="nav-link dark:text-white">
                <Link to={"/orders"}>Orders</Link>
              </li>
              <li className="relative">
                <Link to={"/wishList"}>
                  <i className=" fa-solid fa-heart text-xl text-darkPrimary me-2  hover:-translate-y-1 transition-all duration-300 hover:text-primary cursor-pointer"></i>
                </Link>
              </li>
              <li className="relative">
                <Link to={"/cart"}>
                  <i className="fa-solid fa-cart-shopping fa-md text-darkPrimary me-3 cursor-pointer hover:text-gray-800 transition-all hover:-translate-y-1  duration-300" />
                </Link>
                {cart?.numOfCartItems > 0 && (
                  <div className="bg-primary size-5 text-center text-white text-sm rounded-full absolute -top-2 left-60 font-bold">
                    {cart.numOfCartItems}
                  </div>
                )}
              </li>
              <li className="nav-link dark:text-white">
                <Link to={"/login"}>Login</Link>
              </li>
              <li className="nav-link dark:text-white">
                <Link to={"/register"}>Register</Link>
              </li>
              <ul className="flex gap-2 justify-center items-center">
                <li>
                  <a
                    target="_blank"
                    href="https://www.facebook.com"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-facebook text-[#0866ff] hover:-translate-y-1 transition duration-300"></i>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.instagram.com"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-instagram text-[#E1306C] hover:-translate-y-1 transition duration-300"></i>
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://www.x.com" rel="noreferrer">
                    <i className="fa-brands fa-x-twitter text-darkPrimary hover:-translate-y-1 transition duration-300"></i>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-linkedin text-[#0077B5] hover:-translate-y-1 transition duration-300"></i>
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.youtube.com"
                    rel="noreferrer"
                  >
                    <i className="fa-brands fa-youtube text-[#FF0000] hover:-translate-y-1 transition duration-300 me-4"></i>
                  </a>
                </li>
              </ul>
              <li className="text-lg cursor-pointer" onClick={logOut}>
                <LogOut className="text-slate-700 text-md dark:text-white m-auto" />
                {/* <span >LogOut</span> */}
              </li>
              <li>
                <button
                  onClick={changeTheme}
                  className="btn dark:text-white m-auto "
                >
                  {theme === "light" ? (
                    <Moon size={25} className="cursor-pointer " />
                  ) : (
                    <Sun size={25} className="cursor-pointer" />
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
