import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext= createContext()

export const useAuth=()=>{
  return useContext(AuthContext)
}

export const AuthProvider=({children})=>{
  const [isLoggedin, setisLoggedin]=useState(false)
  const value={isLoggedin,setisLoggedin}
  useEffect(()=>{
    const userid=localStorage.getItem('user_id')
    if(userid)
      setisLoggedin(true)
    else
      setisLoggedin(false)
  })
  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

