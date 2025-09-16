import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useDetailsApi from "../../Hooks/useDetailsApis";
import useDetailsApis from "../../Hooks/useDetailsApis";

export default function CategoryDetails() {

  const { id } = useParams(); // 

  const Navigate = useNavigate();



const { data, isLoading, isFetching, isError, error } = useDetailsApis("categories", id);


  return (
    <div className=" bg-white shadow-lg rounded-lg mx-auto py-10 px-5 w-1/2 mt-24 dark:bg-slate-700 dark:shadow-lg">
      {/* الايقونه الرجوع */}
      <button
        className="bg-primary text-white p-2 rounded-full text-xl cursor-pointer hover:-translate-x-2.5 transition-all"
        onClick={() => Navigate("/categories")}
      >
        <ArrowLeft />
      </button>

     {isLoading ? (
  <Loading />
) : data?.data.data ? (
  <div className="text-center">
    <img
      src={data?.data.data.image}
      alt={data?.data.data.name}
      className="w-90 h-80 object-cover rounded-xl mx-auto mb-5"
    />
    <h2 className="text-2xl font-bold text-darkPrimary mb-2">
      {data?.data.data.name}
    </h2>

    <div className="text-primary text-left w-fit mx-auto space-y-2">
      <p><span className="font-semibold text-darkPrimary text-md">ID:</span> {data?.data.data._id}</p>
      <p><span className="font-semibold text-darkPrimary text-md">Icon:</span> {data?.data.data.icon || "No icon"}</p>
      <p><span className="font-semibold text-darkPrimary text-md">Active:</span> {data?.data.data.isActive ? "Yes" : "No"}</p>
      <p><span className="font-semibold text-darkPrimary text-md">Deleted:</span> {data?.data.data.isDeleted ? "Yes" : "No"}</p>
      <p><span className="font-semibold text-darkPrimary text-md">Created At:</span> {new Date(data?.data.data.createdAt).toLocaleString()}</p>
      <p><span className="font-semibold text-darkPrimary text-md">Updated At:</span> {new Date(data?.data.data.updatedAt).toLocaleString()}</p>
    </div>
  </div>
) : (
  <p className="text-center text-red-500">Category not found.</p>
)}

    </div>
  );
}
