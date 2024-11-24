'use client'

import React from 'react'
import { handleSignOut } from '../actions/cognitoActions'
import { useParams, useRouter } from "next/navigation";
import { Sidebar } from '@/components/sidebar';
import axios from 'axios';

function page({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const handleLogout = async() => {
    await handleSignOut();
  }
  const handelShopify = async()=>{
    router.push('/api/auth/')
  }
  axios.get('/api/sellerId');
  // router.push('/api/sellerId')

  return (
    <div className="flex h-screen overflow-hidden">
    <Sidebar />
    <main className="flex-1 overflow-y-auto bg-background">
      {children}
    </main>
  </div>
  )
}

export default page