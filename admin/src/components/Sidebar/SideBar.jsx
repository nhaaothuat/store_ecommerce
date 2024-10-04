import React from 'react'
import "./SideBar.css"
import { IoAddCircle } from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
const SideBar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
          <NavLink to="/add" className="sidebar-option">
               <IoAddCircle />
               <p>Add Items</p>
          </NavLink>
          <NavLink to="/list" className="sidebar-option">
               <FaListCheck />
               <p>List Items</p>
          </NavLink>
          <NavLink to="/order" className="sidebar-option">
               <FaListCheck />
               <p>Orders</p>
          </NavLink>
      </div>
    </div>
  )
}

export default SideBar
