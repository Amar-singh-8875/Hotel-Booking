import React from "react";
import { Link } from "react-router-dom";
import assets from "../../assets/assets";
import { UserButton } from "@clerk/clerk-react";
import { FaHotel } from "react-icons/fa";

const Navbar = () => {
  return (
    <div
      className="flex items-center justify-between px-4 md:px-8
    border-b border-gray-300 py-3 bg-white transition-all duration-300"
    >
      {/* <Link to='/'>
        <img src={assets.logo} alt="logo" className='h-9 invert opacity-80'/>
      </Link> */}
      <h1 className="flex items-center gap-3 text-xl font-bold font-poppins text-gray-800 mb-4">
        <FaHotel className="text-2xl text-blue-600" />
        <span>Hotel Booking</span>
      </h1>
      <UserButton />
    </div>
  );
};

export default Navbar;
