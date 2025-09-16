import React, { useContext, useState } from "react";


import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Users } from "lucide-react";
import { authContext } from "../../../Context/AuhContext";
import { Link } from "react-router-dom";

export default function ResetPassword() {
 let navigate = useNavigate();
  const [error, setError] = useState("");
   const[disabledBtn ,setDisabledBtn]=useState(false)

  const passReg = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$/;

  let { token, setToken } = useContext(authContext);

  const [showPass, setShowPass] = useState("newPassword");
  function toggleShowPass() {
    setShowPass(showPass === "newPassword" ? "text" : "newPassword");
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email must be required")
      .email("must be an email"),
    newPassword: Yup.string()
      .required("newPassword must be requird")
      .matches(
        passReg,
        "newPasswordmust be at least 8 characters and include letters, numbers, and a special character (e.g. @, #, $, _)"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
     newPassword: "",
    },
    onSubmit: (x) => {
      console.log(x);
      sendDataToResetPass(x);
    },
    validationSchema,
  });

  async function sendDataToResetPass(values) {
    // console.log(values);
setDisabledBtn(true)
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      method: "PUT",
      data: values,
    };

    let LoadingToast = toast.loading("Waiting...");

    try {
      const { data } = await axios.request(options);
      console.log(data.token);

      toast.success("Password Changed Successfully..");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setError(error.response.data.message);
    } finally {
      toast.dismiss(LoadingToast);
      setDisabledBtn(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-4 py-10 gap-10">
      <div className="bg-white dark:bg-slate-700 mt-20 shadow rounded-2xl flex flex-col md:flex-row w-[100%] max-w-5xl overflow-hidden justify-center items-center">
        <div className="w-full md:w-1/2 p-8 ">
          <div className="w-full max-w-md m-auto ">
            <div className="flex items-center justify-center gap-3 mb-5">
              <Users className="text-4xl text-primary" strokeWidth={2.7} />
              <h2 className="text-3xl font-Playfair font-bold text-primary leading-none">
               Reset Password
              </h2>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-4 ">
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

              <div className="relative">
                <input
                  type={showPass}
                  placeholder="Enter Your newPassword"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  name="newPassword"
                  onBlur={formik.handleBlur}
                  className="w-full border border-slate-500 px-4 py-2 rounded focus:outline-primary text-darkPrimary placeholder-gray-500 "
                />

                <div
                  className="absolute right-4 top-[20%] cursor-pointer"
                  onClick={toggleShowPass}
                >
                  {showPass === "password" ? (
                    <Eye className="text-slate-500" />
                  ) : (
                    <EyeOff className="text-slate-500" />
                  )}
                </div>

                {formik.errors.newPassword && formik.touched.newPassword && (
                  <p className="text-red-800">{formik.errors.newPassword}</p>
                )}
              </div>

             <div className="flex justify-between">
               <button disabled={disabledBtn}
                type="submit"
                className="w-full bg-primary text-white py-2 rounded hover:bg-darkPrimary mt-3 transition"
              >
                {disabledBtn ? <i className="fa-solid fa-spinner fa-spin"></i> :'Reset'}
           
              </button>



             </div>

              {error && (
                <p className="bg-red-300 rounded-3xl p-3 my-2">{error}</p>
              )}
            </form>
          </div>
        </div>

       
      </div>
    </div>
  );
}
