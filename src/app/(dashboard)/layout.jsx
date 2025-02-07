
import React from 'react'
import DashNavbar from '../component/comp_dashboard/DashNavbar'
const layout = ({children}) => {
  return (
    <>
     <DashNavbar/>
     <div>{children}</div>
    </>
   
  )
}

export default layout