import React from 'react'

import ProfileInfoCard from '../cards/ProfileInfoCard'
import prepgrid from '../../../public/prepgrid.svg'
import prepgridIcon from '../../../public/prepgrid-icon.svg'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center mb-7 bg-neutral-900 p-5 px-4">
    <div className="w-1/3">
      <img src={prepgrid} alt="PREPGRID" className=" h-6 " onClick={()=>navigate("/dashboard")}/>
    </div>
    <img
      src={prepgridIcon}
      alt=""
      className="w-1/3 h-7 hidden md:block "
      onClick={()=>navigate("/")}
    />

    <div className="w-1/3 flex items-center justify-end-safe">
     
        <ProfileInfoCard />
     
     
    </div>
  </header>
  )
}

export default Navbar