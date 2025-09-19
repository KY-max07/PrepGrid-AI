import React from 'react'
import { Link } from 'react-router-dom'
import ProfileInfoCard from '../cards/ProfileInfoCard'

const Navbar = () => {
  return (
    <div className=' fixed w-full h-20 bg-neutral-100 border-b border-neutral-200 z-100'>
        <div className='flex items-center justify-between container mx-auto p-4'>
            <Link to='/dashboard'>
            <h2 className='font-extrabold text-2xl'>PrepGrid.ai</h2>
            </Link>
            <ProfileInfoCard/>
        </div>
        
    </div>
  )
}

export default Navbar