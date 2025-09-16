import React, { useContext, useState } from "react";
import illustration from "../../../assets/Register.avif"; // الصورة الجانبية
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Users } from "lucide-react";
import { authContext } from "../../../Context/AuhContext";
import { Link } from "react-router-dom";


export default function Login() {
  let navigate = useNavigate();
  const [error, setError] = useState("");
   const[disabledBtn ,setDisabledBtn]=useState(false)

  const passReg = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$/;

  let { token, setToken ,verifyToken } = useContext(authContext);

  const [showPass, setShowPass] = useState("password");
  function toggleShowPass() {
    setShowPass(showPass === "password" ? "text" : "password");
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email must be required")
      .email("must be an email"),
    password: Yup.string()
      .required("password must be requird")
      .matches(
        passReg,
        "Password must be at least 8 characters and include letters, numbers, and a special character (e.g. @, #, $, _)"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (x) => {
      console.log(x);
      sendDataToLogIn(x);
    },
    validationSchema,
  });

  async function sendDataToLogIn(values) {
    // console.log(values);
setDisabledBtn(true)
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
      method: "Post",
      data: values,
    };

    let LoadingToast = toast.loading("Waiting...");

    try {
      const { data } = await axios.request(options);
      console.log(data.token);

      localStorage.setItem("token",data.token);
      setToken(data.token);
      verifyToken()

      toast.success("Logged in successfully..");

      setTimeout(() => {
        navigate("/");
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
    <div className="flex flex-col md:flex-row items-center justify-center px-4 py-25 gap-10">
      <div className="bg-white dark:bg-slate-700 mt-5 shadow rounded-2xl flex flex-col md:flex-row w-[100%] max-w-5xl overflow-hidden justify-center items-center">
        <div className="w-full md:w-1/2 p-8 ">
          <div className="w-full max-w-md m-auto ">
            <div className="flex items-center justify-center gap-3 mb-5">
              <Users className="text-4xl text-primary" strokeWidth={2.7} />
              <h2 className="text-3xl font-Playfair font-bold text-primary leading-none">
                Login
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
                  placeholder="Enter Your Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  name="password"
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

                {formik.errors.password && formik.touched.password && (
                  <p className="text-red-800">{formik.errors.password}</p>
                )}
              </div>

             <div className="flex flex-col">
             <Link to={'/forgetPassword'} className="text-primary text-sm underline hover:text-darkPrimary transition-all m-1 flex justify-end">Foget Password?</Link>

               <button disabled={disabledBtn}
                type="submit"
                className="w-full bg-primary text-white py-2 rounded hover:bg-darkPrimary mt-3 transition"
              >
                {disabledBtn ? <i className="fa-solid fa-spinner fa-spin"></i> :'Log In'}
           
              </button>



             </div>

              {error && (
                <p className="bg-red-300 rounded-3xl p-3 my-2">{error}</p>
              )}
            </form>
          </div>
        </div>

        {/* the image */}
        <div className="hidden md:flex w-full md:w-1/2 items-center justify-center p-5 ">
          <img
            src={illustration}
            alt="register illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
