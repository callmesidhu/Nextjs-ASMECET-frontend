// @/src/pages/index.tsx
import React from 'react';
import '../app/globals.css';
import Navbar from '@/Components/Navbar';
import Banner from '@/Components/Banner';
import About from '@/Components/About';

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