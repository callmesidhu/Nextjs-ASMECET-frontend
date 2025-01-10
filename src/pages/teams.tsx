"use client";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import intro from './../../public/intro.png';
import Navbar from "@/Components/Navbar";
import logo from './../../public/ASMEcet.jpeg';
import clsx from 'clsx';
import people from '../../Data/teams.json';

function Teams() {
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
    <Navbar />
<div ref={teamsRef} id='teams' className="mt-24 justify-center items-center flex flex-col">
            <div className="relative">
                {/* Responsive flex layout for large and small screens */}
                <div className="flex flex-col items-center lg:items-start">
                    <div className="flex flex-1 justify-center items-center flex-col">
                        {/* Responsive heading sizes */}
                        <h1 className="text-[40px] font-serif text-gtext text-center lg:text-left">
                            Our Team
                        </h1>
                        <br />
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {people.map((member) => (
          <div
            key={member.id}
            className={clsx(
              "bg-[#061d0d] p-4 rounded-xl transform transition duration-300 hover:scale-105",
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
                        className="-z-20 absolute right-0 float-end"
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
