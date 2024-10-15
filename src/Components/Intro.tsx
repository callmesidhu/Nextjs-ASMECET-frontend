"use client";

import Image from "next/image";
import intro from './../../public/intro.png';

export const Intro = () => {
    return (
        <div className="mt-24 ">
            <div className="relative ">
                <div className="flex flex-1 flex-row">
                    <div className="flex flex-1 justify-center items-center py-16 flex-col">
                        <h1 className="lg:text-[200px] md:text-[150px] text-[100px] font-serif text-gtext">ASME-CET</h1>
                        <br />
                        <i>
                            <h1 className="text-3xl font-serif font-extralight">
                                The American Society of Mechanical Engineers
                                College of Engineering Trivandrum
                            </h1>
                        </i>
                    </div>

                    <Image
                        className="absolute right-0 h-[100%] w-auto -z-10"
                        src={intro}
                        alt="Logo"
                    />
                </div>
                <div className="mx-52 w-[40%]">
                    <i>
                        <h1 className="text-2xl font-serif">
                            The College of Engineering, Thiruvananthapuram, commonly shortened to CET, is an engineering College in the Indian state of Kerala, situated in Trivandrum
                        </h1>
                    </i>
                </div>
            </div>
            {/* Scrolling Text (replace marquee) */}
            <div className="overflow-hidden mt-8">
                <h1 className="animate-scroll whitespace-nowrap text-center text-8xl font-semibold">
                    The American Society of Mechanical Engineers (ASME) is an American professional association that, in its own words, &quot;promotes the art, science, and practice of multidisciplinary engineering and allied sciences around the globe&quot; via &quot;continuing education, training and professional development, codes and standards, research, conferences and publications, government relations, and other forms of outreach.&quot;
                </h1>
            </div>
        </div>
    );
}
