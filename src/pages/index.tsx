// @/src/pages/index.tsx
import React from 'react';
import Navbar from '@/Components/Navbar';
import About from '@/Components/About';
import Banner from '@/Components/Banner';
import UpcomingEvents from '@/Components/Upcoming';


function HomePage() {
  return (
    <>
      <Navbar />
      <Banner />
      <About />
      <UpcomingEvents />
    </>
  );
}

export default HomePage;