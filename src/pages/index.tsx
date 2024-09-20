// @/src/pages/index.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Banner from '@/components/Banner';
import '../app/globals.css';

function HomePage() {
  return (
    <>
      <Navbar />
      <Banner />
      <About />
    </>
  );
}

export default HomePage;