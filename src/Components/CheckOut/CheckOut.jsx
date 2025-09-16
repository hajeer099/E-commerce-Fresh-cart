import React, { useContext, useState } from "react";
import image1 from "../../assets/cash1-DfoK3QaK.png";
import image2 from "../../assets/online1-CDuK_NPr.png";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { cartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CheckOut({ totalPrice }) {
  let { cart, getLoggedUserCart } = useContext(cartContext);
  let navigate = useNavigate();
  let [pay, setPay] = useState("cash");

  const phoneReg = /^(010|011|012|015)[0-9]{8}$/;
  const validationSchema = Yup.object({
    details: Yup.string().required("details must be required"),
    phone: Yup.string()
      .required("phone must be required")
      .matches(phoneReg, "Phone number must be a valid Egyptian number"),
    city: Yup.string()
      .required(" city must be required")
      .min(2, "at least two chars"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (x) => {
      //   console.log(x);
      if (pay == "cash") {
        payCash(x);
      } else {
        payOnline(x);
      }
    },
    validationSchema,
  });

  async function payOnline(values) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      if (data.status == "success") {
        window.location.href = data.session.url;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function payCash(values) {
    let LoadingToast = toast.loading("Waiting...");
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`,
        {
          shippingAddress: values,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      toast.success("Order Created Successfully");
      if (data.status == "success") {
        navigate("/orders");
        getLoggedUserCart();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      toast.dismiss(LoadingToast);
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-center text-2xl font-semibold text-darkPrimary relative mb-6">
        <span className="inline-block border-y-2 border-primary px-6 py-1">
          Check Out
        </span>
      </h2>

      <div className="bg-white shadow-lg rounded p-6 max-w-md mx-auto dark:bg-slate-600 dark:shadow-lg ">
        <h3 className="text-lg font-semibold text-darkPrimary mb-4">
          Cart totals
        </h3>

        <p className="text-md font-medium mb-4">
          <span className="text-gray-600">SubTotal :</span>
          <span className="text-primary ml-2 font-bold">EGP {totalPrice}</span>
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <div>
            <input
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              placeholder="Enter Your City Name"
              className="w-full border dark:placeholder:text-slate-400 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {formik.errors.city && formik.touched.city && (
              <p className="text-red-800">{formik.errors.city}</p>
            )}
          </div>

          <div>
            <input
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="tel"
              placeholder="Enter Your Phone"
              className="w-full border border-gray-300 p-2 dark:placeholder:text-slate-400 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="text-red-800">{formik.errors.phone}</p>
            )}
          </div>

          <div>
            <input
              name="details"
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Details"
              rows="3"
              className="w-full border dark:placeholder:text-slate-400 border-gray-300 p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {formik.errors.details && formik.touched.details && (
              <p className="text-red-800">{formik.errors.details}</p>
            )}
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => {
                setPay("cash");
              }}
              type="submit"
              className="flex-1 bg-primary hover:bg-darkPrimary text-white px-4 rounded py-1 transition flex items-center justify-center gap-2"
            >
              <img src={image1} alt="Cash Icon" className="size-9" />
              Cash Order
            </button>

            <button
              onClick={() => {
                setPay("online");
              }}
              type="submit"
              className="flex-1 bg-gray-100 hover:bg-primary text-darkPrimary hover:text-white py-1 px-4 rounded transition flex items-center justify-center gap-2"
            >
              <img src={image2} alt="Online Icon" className="size-9" />
              Online Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
