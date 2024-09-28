// @/src/pages/index.tsx
import React from 'react';
import Navbar from '@/Components/Navbar';
import About from '@/Components/About';
import Banner from '@/Components/Banner';
import UpcomingEvents from '@/Components/Upcoming';
import Contact from '@/Components/Contact';


function HomePage() {
  return (
    <>
      <Navbar />
      <Banner />
      <About />
      <Contact/>
    </>
  );
}

export default HomePage;