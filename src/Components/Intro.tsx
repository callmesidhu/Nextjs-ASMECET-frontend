"use client";

import Image from "next/image";
import intro from './../../public/intro.png';

export const Intro = () => {
    return (
        <div id='home' className="mt-24">
            <div className="relative">
                {/* Responsive flex layout for large and small screens */}
                <div className="flex flex-col lg:flex-row items-center lg:items-start">
                    <div className="flex flex-1 justify-center items-center py-8 md:py-16 flex-col">
                        {/* Responsive heading sizes */}
                        <h1 className="lg:text-[160px] md:text-[120px] text-[50px] font-serif text-gtext text-center lg:text-left">
                            ASME-CET
                        </h1>
                        <br />
                        <i>
                            <h1 className="text-lg md:text-2xl font-serif font-extralight text-center">
                                The American Society of Mechanical Engineers<br />
                                College of Engineering Trivandrum
                            </h1>
                        </i>
                    </div>

                    {/* Adjust image layout for responsiveness */}
                    <Image
                        className="-z-20 absolute right-0 float-end"
                        src={intro}
                        alt="Logo"
                      
                    />
                </div>

                {/* Responsive paragraph */}
                <div className="mx-8 lg:mx-52 w-[90%] lg:w-[50%] mt-8 lg:mt-0 text-center lg:text-left">
                    <i>
                        <h1 className="text-base md:text-lg lg:text-2xl font-serif">
                            The College of Engineering, Thiruvananthapuram, commonly shortened to CET, is an engineering college in the Indian state of Kerala, situated in Trivandrum.
                        </h1>
                    </i>
                </div>
            </div>

            {/* Responsive Scrolling Text */}
            <div className="overflow-hidden mt-8">
                <h1 className="animate-scroll whitespace-nowrap text-3xl md:text-5xl lg:text-6xl xl:text-8xl font-semibold">
                    The American Society of Mechanical Engineers (ASME) is an American professional association that, in its own words, &quot;promotes the art, science, and practice of multidisciplinary engineering and allied sciences around the globe&quot; via &quot;continuing education, training and professional development, codes and standards, research, conferences and publications, government relations, and other forms of outreach.&quot;
                </h1>
            </div>
        </div>
    );
}
