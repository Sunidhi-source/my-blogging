import React from 'react'
import { Outlet } from 'react-router'
import Admin_sidebar from '../Components/Admin_sidebar'

function Admin_layout() {
  return (
    <>
      <main className='py-3'>
      <Admin_sidebar/>
      </main>
      <Outlet/>
    </>
  )
}

export default Admin_layout
