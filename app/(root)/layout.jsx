"use client"
import React, { useEffect } from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
const layout = ({children}) => {
  return (
    <>
    <Navbar />
    <div>{children}</div> 
    <Footer/>
    </>
  )
}

export default layout