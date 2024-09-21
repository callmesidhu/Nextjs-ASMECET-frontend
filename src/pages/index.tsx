// @/src/pages/index.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Banner from '@/components/Banner';
import UpcomingEvents from '@/components/Upcoming';

import About from '@/Components/About';

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