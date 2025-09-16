import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../Context/AuhContext";

export default function ProtectedRoutes({ children }) {
  let { token, setToken } = useContext(authContext);
  return <div>{token ? children : <Navigate to={"/login"} />}</div>;
}
