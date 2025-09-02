import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext= createContext()

export const useAdmin=()=>{
  return useContext(AdminContext)
}

export const AdminProvider=({children})=>{
  const [isaLoggedin, setisaLoggedin]=useState(false)
  const value={isaLoggedin,setisaLoggedin}
  useEffect(()=>{
    const adminid=localStorage.getItem('admin_id')
    if(adminid)
      setisaLoggedin(true)
    else
      setisaLoggedin(false)
  })
  return(
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}

