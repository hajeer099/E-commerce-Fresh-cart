import { Children, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Layout from "./Pages/Layout/Layout";
import Products from "./Pages/Products/Products";
import Categories from "./Pages/Categories/Categories";
import Brands from "./Pages/Brands/Brands";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Login from "./Pages/Authentication/Login/Login";
import Register from "./Pages/Authentication/Register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import NotFound from './Pages/Notfound/Notfound'
import toast, { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./Protected/ProtectedRoutes";
import AuhContextProvider from "./Context/AuhContext";
import LoginProtected from "./Protected/LoginProtected";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import ForgetPasword from "./Pages/Authentication/ForgetPassword/ForgetPasword";
import VerifyCode from "./Pages/Authentication/VerifyCode/VerifyCode";
import ResetPassword from "./Pages/Authentication/ResetPassword/ResetPassword";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import WishList from "./Pages/WishList/WishList";
import WishLishContextProvider from "./Context/WishListContext";
import { QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import BrandsDetails from "./Components/BrandsDetails/BrandsDetails";
import ScrollToTopBtnContextProvider from "./Context/ScrollToTopBtnContext";

export default function App() {



  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/productsDetails/:id",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/category/:id",
          element: (
            <ProtectedRoutes>
              <CategoryDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
         {
          path: "/brands/:id",
          element: (
            <ProtectedRoutes>
              <BrandsDetails/>
            </ProtectedRoutes>
          ),
        },


        {
          path: "/orders",
          element: (
            <ProtectedRoutes>
              <Orders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoutes>
              <h2>allorders</h2>
            </ProtectedRoutes>
          ),
        },

        {
          path: "/wishList",
          element: (
            <ProtectedRoutes>
              <WishList />
            </ProtectedRoutes>
          ),
        },

        {
          path: "/login",
          element: (
            <LoginProtected>
              <Login />
            </LoginProtected>
          ),
        },

        {
          path: "/register",
          element: (
            <LoginProtected>
              <Register />
            </LoginProtected>
          ),
        },

        {
          path: "/forgetPassword",
          element: <ForgetPasword />,
        },

        {
          path: "/verifyCode",
          element: <VerifyCode />,
        },

        {
          path: "/resetPassword",
          element: <ResetPassword />,
        },
        // {path:'*' , element:<NotFound/>}
      ],
    },
  ]);

 let client =new QueryClient()

 return (
  <div>
    <QueryClientProvider client={client}>
      <AuhContextProvider>
        <WishLishContextProvider>
          <CartContextProvider>
            <ScrollToTopBtnContextProvider> 
              <RouterProvider router={routes} />
              <Toaster />
            </ScrollToTopBtnContextProvider> 
          </CartContextProvider>
        </WishLishContextProvider>
      </AuhContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </div>
);

}
