import React from 'react'
import { Outlet } from 'react-router'
import User_sidebar from '../Components/User_sidebar'

function User_layout() {
  return (
    <>
      <User_sidebar/>
      <main className='py-5'>
      <Outlet/>
      </main>
    </>
  )
}

export default User_layout