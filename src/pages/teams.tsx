"use client";

import Image from "next/image";
import intro from './../../public/intro.png';
import Navbar from "@/Components/Navbar";

function Teams() {
  return (
    <>
    <Navbar />
<div id='home' className="mt-24">
            <div className="relative">
                {/* Responsive flex layout for large and small screens */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start">
                    <div className="flex flex-1 justify-center items-center flex-col">
                        {/* Responsive heading sizes */}
                        <h1 className="text-[40px] font-serif text-gtext text-center lg:text-left">
                            Our Team
                        </h1>
                        <br />
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
