import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";


export default function VerifyCode() {
 let navigate = useNavigate();

  const[disabledBtn ,setDisabledBtn]=useState(false)



  const validationSchema = Yup.object({
    
    resetCode: Yup.string()
      .required("resetCode must be required")
     
  
  });

  let formik = useFormik({
    initialValues: {
       resetCode: "",
    },
    onSubmit: (x) => {
      console.log(x);
      sendDataToVerify(x);
    },
    validationSchema,
  });

  async function sendDataToVerify(values) {
    // console.log(values);
 let LoadingToast = toast.loading("Loading...");
 setDisabledBtn(true)
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      method: "Post",
      data: values,
    };
   
    try {
      const { data } = await axios.request(options);
      // console.log(data);
      toast.success("Code Verified");
      setTimeout(() => {
        navigate("/resetPassword");
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
              Verify Code
            </h2>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-1">
           
            <div>
              <input
                type="text"
                placeholder="Enter Your  resetCode"
                value={formik.values. resetCode}
                onChange={formik.handleChange}
                name="resetCode"
                onBlur={formik.handleBlur}
                className="w-full border border-slate-500 px-4 py-2 rounded focus:outline-primary text-darkPrimary placeholder-gray-500 mb-4"
              />
              {formik.errors. resetCode && formik.touched. resetCode && (
                <p className="text-red-800">{formik.errors. resetCode}</p>
              )}
            </div>

            <button disabled={disabledBtn}
              type="submit"
              className="w-full bg-primary text-white py-2 rounded hover:bg-darkPrimary mt-5 transition"
            >
              {disabledBtn ? <i className="fa-solid fa-spinner fa-spin"></i> :'Verify '}
            </button>

           
          </form>
        </div>
      </div>
    </div>
  );
}
