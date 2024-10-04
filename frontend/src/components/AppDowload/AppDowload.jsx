import React from 'react'
import "./AppDowload.css"
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaAppStoreIos } from "react-icons/fa";   
const AppDowload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For better Experience Download <br /> Company App </p>
      <div className="app-download-platforms">
     <IoLogoGooglePlaystore className='platform'/>
      <FaAppStoreIos className='platform'/>
      </div>
    </div>
  )
}

export default AppDowload
