import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";



export default function ForgetPasword() {
  let navigate = useNavigate();

  const[disabledBtn ,setDisabledBtn]=useState(false)



  const validationSchema = Yup.object({
    
    email: Yup.string()
      .required("email must be required")
      .email("must be an email"),
  
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (x) => {
      console.log(x);
      sendDataToForget(x);
    },
    validationSchema,
  });

  async function sendDataToForget(values) {
    // console.log(values);
 let LoadingToast = toast.loading("Loading...");
 setDisabledBtn(true)
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      method: "Post",
      data: values,
    };
   
    try {
      const { data } = await axios.request(options);
      console.log(data);
      toast.success("Code Send To Your Email");
      setTimeout(() => {
        navigate("/verifyCode");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(LoadingToast);
      setDisabledBtn(false)
    }
  }

  return (
    <div className=" flex flex-col md:flex-row items-center justify-center px-4 py-10 gap-10 min-h-screen ">
      <div className=" bg-white dark:bg-slate-700 shadow rounded-2xl flex flex-col md:flex-row w-[40%] max-w-5xl overflow-hidden">
        <div className="w-[100%]  p-8 m-auto">
          <div className="flex items-center justify-center gap-3 mb-5">
            <Users className="text-4xl text-primary" strokeWidth={2.7} />
            <h2 className="text-3xl font-Playfair font-bold text-primary leading-none">
              Forget Password
            </h2>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-1">
           
            <div>
              <input
                type="email"
                placeholder="Enter Your Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
                onBlur={formik.handleBlur}
                className="w-full border border-slate-500 px-4 py-2 rounded focus:outline-primary text-darkPrimary placeholder-gray-500 mb-4"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-red-800">{formik.errors.email}</p>
              )}
            </div>

            <button disabled={disabledBtn}
              type="submit"
              className="w-full bg-primary text-white py-2 rounded hover:bg-darkPrimary mt-5 transition"
            >
              {disabledBtn ? <i className="fa-solid fa-spinner fa-spin"></i> :'Forget '}
            </button>

           
          </form>
        </div>
      </div>
    </div>
  );
}
