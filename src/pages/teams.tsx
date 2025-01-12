"use client";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import intro from './../../public/intro.png';
import logo from './../../public/ASMEcet.jpeg';
import clsx from 'clsx';
import people from '../../Data/teams.json';
import { useRouter } from 'next/router';
import navlogo from './../../public/nav-logo.png';
import '../Components/Teams.css';


function Teams() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
  
    const handleScroll = (sectionId: string) => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
    const handleSignIn = () => {
      router.push('/signIn');
    };
    const goToHome = () => {
      router.push('/');
    };

  const [isActive, setIsActive] = useState(false);
  const teamsRef = useRef<HTMLDivElement | null>(null);
    // Intersection Observer logic
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsActive(entry.isIntersecting);
        },
        { threshold: 0.2 } // Adjust based on when you want the effect to trigger
      );
  
      if (teamsRef.current) {
        observer.observe(teamsRef.current);
      }
  
      return () => {
        if (teamsRef.current) {
          observer.unobserve(teamsRef.current);
        }
      };
    }, []);
  return (
    <>
     <div className="flex bg-black w-full justify-between py-5 px-2 fixed top-0 z-10">
        <div className='m-4'>
        <Image
      src={navlogo}
      width={100}
      height={100}
      alt="Logo"
    />
        </div>
        <div className="flex flex-row gap-4 items-center">
          <button onClick={goToHome}>
            <h1 className='text-xl font-serif'>
              Home
            </h1>
          </button>
          <button
            onClick={handleSignIn}
            className="px-6 py-2 bg-white text-black hover:bg-gray-300 rounded-3xl "
          >
            Sign&nbsp;In
          </button>
        </div>
      </div>
      <div className=" flex flex-col p-5 bg-black">
        <button
          onClick={handleSignIn}
          className="px-4 py-2 bg-[#0F2819] text-gtext rounded hover:bg-[#000F0A]"
        >
          Sign In
        </button>
      </div>
<div ref={teamsRef} id='teams' className="mt-24 justify-center items-center flex flex-col">
            <div className="relative p-9">
                {/* Responsive flex layout for large and small screens */}
                <div className="flex flex-col lg:items-start">
                    <div className="flex flex-1 justify-center items-center flex-col">
                        {/* Responsive heading sizes */}
                        <div>
                        <h1 className="text-[40px] font-serif text-gtext text-center">
                            Our Team
                        </h1>
                        <div className="button-container">
                          <button className="btn active">Execome</button>
                          <button className="btn">Web Team</button>
                        </div>

                        </div>
                        <br />
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {people.execome.map((member) => (
          <div
            key={member.id}
            className={clsx(
              "bg-gray-800 p-4 rounded-xl transform transition duration-300 hover:scale-105",
              { 'opacity-0 translate-y-8': !isActive }, // Hidden state
              { 'opacity-100 translate-y-0 transition-all duration-700 ease-in-out delay-0': isActive } // Visible state
            )}
          >
            <Image src={member.imgURL || logo} className="rounded-lg" alt={member.name} />
            <h2 className="text-lg font-semibold text-green-400 text-center">{member.name}</h2>
            <p className="text-white text-center">{member.role}</p>
          </div>
        ))}
      </div>
                    {/* Adjust image layout for responsiveness */}
                    <Image
                        className="-z-20 fixed right-0 float-end"
                        src={intro}
                        alt="Logo"
                      
                    />
                </div>


            </div>

    
        </div>
    </>
  )
}

export default Teams
