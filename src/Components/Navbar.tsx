"use client";
import React, { useState } from 'react';

type Props = {};

function Navbar(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex bg-slate-400 w-full justify-between p-5 fixed top-0 z-10">
        <div>
          Logo
        </div>
        <div className="hidden md:flex flex-row gap-16">
          <p>Home</p>
          <p>Achievements</p>
          <p>Team</p>
          <p>Contact</p>
        </div>
        <div className="md:hidden flex items-center">
          <button className="mobile-menu-button" onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`mobile-menu ${isOpen ? 'block' : 'hidden'} md:hidden flex flex-col gap-4 p-5 bg-slate-400`}>
        <p>Home</p>
        <p>Achievements</p>
        <p>Team</p>
        <p>Contact</p>
      </div>
    </>
  );
}

export default Navbar;