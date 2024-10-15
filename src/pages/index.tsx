// @/src/pages/index.tsx
import React from 'react';
import Navbar from '@/Components/Navbar';
import About from '@/Components/About';
import Banner from '@/Components/Banner';
import UpcomingEvents from '@/Components/Upcoming';
import Contact from '@/Components/Contact';
import {Intro} from '@/Components/Intro'


function HomePage() {
  return (
    <div className='flex-1 flex w-full h-full'>
      <Navbar />

      <Contact/>
    </div>
  );
}

export default HomePage;