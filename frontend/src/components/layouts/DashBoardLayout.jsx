import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Navbar from './Navbar';

const DashBoardLayout = ({children}) => {
    const {user} = useContext(UserContext);
  return (
    <div className='bg-secondary min-h-screen'>
        <Navbar/>
        {user && <div> {children}</div>}
    </div>
  )
}

export default DashBoardLayout