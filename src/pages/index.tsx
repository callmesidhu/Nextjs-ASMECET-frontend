// @/src/pages/index.tsx
import React from 'react';
import Navbar from '@/Components/Navbar';
import About from '@/Components/About';
import Banner from '@/Components/Banner';
import UpcomingEvents from '@/Components/Upcoming';
import Contact from '@/Components/Contact';
import {Intro} from '@/Components/Intro'
import Asme from '@/Components/Asme';


function HomePage() {
  return (
    <>
      <Navbar />
      <Intro/>
      <Banner />
      <Asme />
      <About />
      <Contact/>
    </>
  );
}

export default HomePage;