'use client'

import React, { useState, createContext, useContext, useEffect, use } from "react"

export interface infoInterface {
  username: string;
  email?: string;
  phone?: string;
  city?: string;
  pincode?: string;
  password?: string;
}

interface contextInterface {
  info: infoInterface | null;
  setInfo: React.Dispatch<React.SetStateAction<infoInterface | null>>
}

// 1. Context initialized with null
export const UserContext = createContext<contextInterface | null>(null);

// Custom hook to avoid null checks in every component
export const useUser=()=>{
  const info=useContext(UserContext)
  if(!info){
    throw new Error("useUser must be used within a ContextProvider")
  }
return info
}


export default function ContextProvider({ children }: { children: React.ReactNode }) {
  const [info, setInfo] = useState<infoInterface | null>(null);


useEffect(()=>{
  const userInfo=localStorage.getItem("userInfo")
  if(userInfo){
    setInfo(JSON.parse(userInfo))
  }
},[])

useEffect(()=>{
  if(info){
    localStorage.setItem("userInfo",JSON.stringify(info))
  }
},[info])

useEffect(()=>{
  if(!info){
    localStorage.removeItem("userInfo")
  }
},[info])



  // Load from local storage on mount so data survives refresh
  // useEffect(() => {
  //   const storedInfo = localStorage.getItem("userInfo");
  //   if (storedInfo) {
  //     try {
  //       setInfo(JSON.parse(storedInfo));
  //     } catch (e) {
  //       console.error("Failed to parse user info from local storage");
  //     }
  //   }
  // }, []);

  // Sync to local storage when info changes
  // useEffect(() => {
  //   if (info) {
  //     localStorage.setItem("userInfo", JSON.stringify(info));
  //   } else {
  //     localStorage.removeItem("userInfo");
  //   }
  // }, [info]);

  return <UserContext.Provider value={{ info, setInfo }}>{children}</UserContext.Provider>
}
