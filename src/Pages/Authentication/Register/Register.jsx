import React, { useState } from "react";
// import illustration from "../../assets/Register.avif";
import illustration   from '../../../assets/Register.avif'
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Users } from "lucide-react";

export default function Register() {
  const passReg = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$/;
  const phoneReg = /^(010|011|012|015)[0-9]{8}$/;
  let navigate = useNavigate();

  const[disabledBtn ,setDisabledBtn]=useState(false)

  const [showPass, setShowPass] = useState("password");
  function toggleShowPass() {
    setShowPass(showPass === "password" ? "text" : "password");
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name must be required")
      .min(3, "the name must be at least 3 chars")
      .max(20, "the name must be less than 20 chars"),
    email: Yup.string()
      .required("email must be required")
      .email("must be an email"),
    password: Yup.string()
      .required("password must be requird")
      .matches(
        passReg,
        "Password must be at least 8 characters and include letters, numbers, and a special character (e.g. @, #, $, _)"
      ),
    rePassword: Yup.string()
      .required("rePassword must be required")
      .oneOf([Yup.ref("password")], "rePassword must be match the password"),
    phone: Yup.string()
      .required("phone must be required")
      .matches(phoneReg, "Phone number must be a valid Egyptian number"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: (x) => {
      console.log(x);
      sendDataToSignUp(x);
    },
    validationSchema,
  });

  async function sendDataToSignUp(values) {
    // console.log(values);
 let LoadingToast = toast.loading("Loading...");
 setDisabledBtn(true)
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
      method: "Post",
      data: values,
    };
   
    try {
      const { data } = await axios.request(options);
      console.log(data);
      toast.success("Successfully created!");
      setTimeout(() => {
        navigate("/login");
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
    <div className=" flex flex-col md:flex-row items-center justify-center px-4 py-10 gap-10  ">
      <div className=" bg-white dark:bg-slate-700  shadow rounded-2xl  mt-20 flex flex-col md:flex-row w-[40%] max-w-5xl overflow-hidden">
        <div className="w-[100%]  p-8 m-auto">
          <div className="flex items-center justify-center gap-3 mb-5">
            <Users className="text-4xl text-primary" strokeWidth={2.7} />
            <h2 className="text-3xl font-Playfair font-bold text-primary leading-none">
              Register Now
            </h2>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-1">
            <div>
              <input
                type="text"
                placeholder="Enter Your Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                name="name"
                onBlur={formik.handleBlur}
                className="w-full border border-slate-500 px-4 py-2 rounded focus:outline-primary text-darkPrimary placeholder-gray-500 mb-4"
              />
              {formik.errors.name && formik.touched.name && (
                <p className="text-red-800">{formik.errors.name}</p>
              )}
            </div>

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
                placeholder="Enter Your Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                onBlur={formik.handleBlur}
                className="w-full border border-slate-500 px-4 py-2 rounded focus:outline-primary text-darkPrimary placeholder-gray-500 mb-4"
              />

              <div
                className="absolute right-4 top-[15%] cursor-pointer"
                onClick={toggleShowPass}
              >
                {showPass === "password" ? (
                  <Eye className="text-slate-500" />
                ) : (
                  <EyeOff className="text-slate-500" />
                )}
              </div>

              {formik.errors.password && formik.touched.password && (
                <p className="text-red-800">{formik.errors.password}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Enter Your Re-Password"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                name="rePassword"
                onBlur={formik.handleBlur}
                className="w-full border border-slate-500 px-4 py-2 rounded focus:outline-primary text-darkPrimary placeholder-gray-500 mb-4"
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <p className="text-red-800">{formik.errors.rePassword}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Enter Your Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                name="phone"
                onBlur={formik.handleBlur}
                className="w-full border border-slate-500 px-4 py-2 rounded focus:outline-primary text-darkPrimary placeholder-gray-500 mb-4"
              />
              {formik.errors.phone && formik.touched.phone && (
                <p className="text-red-800">{formik.errors.phone}</p>
              )}
            </div>

            <button disabled={disabledBtn}
              type="submit"
              className="w-full bg-primary text-white py-2 rounded hover:bg-darkPrimary mt-5 transition"
            >
              {disabledBtn ? <i className="fa-solid fa-spinner fa-spin"></i> :'Sign Up '}
            </button>

            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-green-600 hover:underline">
                Sign in
              </a>
            </p>
          </form>
        </div>

        {/* Illustration */}
        {/* <div className="w-[50%] flex justify-center items-center">
          <img src={illustration} alt="register illustration" className="" />
        </div> */}
      </div>
    </div>
  );
}
