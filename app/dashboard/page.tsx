'use client'

import React from 'react'
import { handleSignOut } from '../actions/cognitoActions'

function page() {
  const handleLogout = async() => {
    await handleSignOut();
  }

  return (
    <div className='flex flex-col justify-center items-center h-[100svh]'>
      dashboard
      <button className='p-2 rounded-md bg-black text-white' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default page