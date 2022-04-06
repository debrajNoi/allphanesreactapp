import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footers/Footer'
import IndexNavbar from '../components/Navbars/IndexNavbar'

function Index() {
  return (
    <main>
        <IndexNavbar />
        <Outlet />
        <Footer />
    </main>
  )
}

export default Index