// @/src/pages/admin.tsx
"use client"; // Add this line at the top

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig';

const Admin = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/signIn');
      }
    });

    // Sign out user when the browser or tab is closed
    const handleBeforeUnload = () => {
      signOut(auth);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      unsubscribe();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [router]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="flex items-center justify-between p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">ASME CET Admin Portal</h1>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </nav>
      <div className="flex items-center justify-center flex-grow">
        <h1 className="text-3xl font-bold">Welcome to the Admin Page</h1>
      </div>
    </div>
  );
};

export default Admin;