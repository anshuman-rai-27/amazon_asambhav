// 'use client'

// import React from 'react'
// import { handleSignOut } from '../actions/cognitoActions'
// import { useParams, useRouter } from "next/navigation";
// import { Sidebar } from '@/components/sidebar';
// import axios from 'axios';

// function page({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const router = useRouter();
//   const handleLogout = async() => {
//     await handleSignOut();
//   }
//   const handelShopify = async()=>{
//     router.push('/api/auth/')
//   }
//   axios.get('/api/sellerId');
//   // router.push('/api/sellerId')

//   return (
//     <div className="flex h-screen overflow-hidden">
//     <Sidebar />
//     <main className="flex-1 overflow-y-auto bg-background">
//       {children}
//     </main>
//   </div>
//   )
// }

// export default page

'use client';

import React, { useEffect, useState } from 'react';
import { handleSignOut } from '../actions/cognitoActions';
import { useRouter } from "next/navigation";
import { Sidebar } from '@/components/sidebar';

function Page({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sellerId, setSellerId] = useState<string | null>(null);

  useEffect(() => {
    // Check for the SellerId cookie
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);
  
    if (cookies.SellerId) {
      setSellerId(cookies.SellerId);
    } else {
      // Fetch SellerId from the API if not found in cookies
      fetch('/api/sellerId', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch SellerId');
          }
          return response.json();
        })
        .then((data) => {
          setSellerId(data.sellerId);
          // Optionally, set the cookie for future requests
          document.cookie = `SellerId=${data.sellerId}; path=/`;
        })
        .catch((error) => console.error('Error fetching SellerId:', error));
    }
  }, []);
  

  const handleLogout = async () => {
    await handleSignOut();
  };

  const handleShopify = async () => {
    router.push('/api/auth/');
  };

  return (
 
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
    
    // </CopilotKit>
  );
}

export default Page;
