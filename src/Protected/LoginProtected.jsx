import React, { useContext } from "react";
import { authContext } from "../Context/AuhContext";
import { Navigate } from "react-router-dom";

export default function LoginProtected({ children }) {
  let { token, setToken } = useContext(authContext);
  return <div>{!token ? children : <Navigate to={"/"} />}</div>;
}
