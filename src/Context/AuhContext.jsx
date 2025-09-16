import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let authContext = createContext(null)

export default function AuhContextProvider({children}) {

  async function verifyToken(){
    try{
     let{data} = await axios.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken',
        {
          headers:{
            token:localStorage.getItem('token')
          }
        }
      )
      // console.log(data);
      localStorage.setItem('userId', data.decoded.id)
      
    }catch(err){
      console.log(err);
      toast.error(err.response.data.message)
      setToken(null)
      localStorage.removeItem('token')
    }
   }

   useEffect(()=>{
    verifyToken()
   },[])


    const [token , setToken]=useState(localStorage.getItem('token'))
  return (
    <div>
      <authContext.Provider value={{token , setToken ,verifyToken}}>
        {children}
      </authContext.Provider>
    </div>
  )
}
