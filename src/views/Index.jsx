import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import IndexNavbar from '../components/Navbars/IndexNavbar'

function Index() {
  return (
    <main>
        <IndexNavbar />
        <Outlet />
    </main>
  )
}

export default Index