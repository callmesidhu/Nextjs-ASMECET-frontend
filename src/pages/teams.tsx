"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import intro from "./../../public/intro.png";
import logo from "./../../public/ASMEcet.jpeg";
import clsx from "clsx";
import people from "../../Data/teams.json";
import { useRouter } from "next/router";
import navlogo from "./../../public/nav-logo.png";
import "../Components/Teams.css";

function Teams() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleScroll = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignIn = () => {
    router.push("/signIn");
  };

  const goToHome = () => {
    router.push("/");
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

  const [web, setWeb] = useState(false);
  const [Team, setTeam] = useState(people.execome);

  const [activeButton, setActiveButton] = useState<string>("execome");

  const handleTeamSwitch = (team: string) => {
    setActiveButton(team);
    setWeb(team === "web");
    setTeam(team === "web" ? people.web : people.execome);
  };

  return (
    <>
      {/* Navbar */}
      <div className="flex bg-black w-full justify-between py-1 px-2 fixed top-0 z-10">
        <div className="m-4">
          <Image src={navlogo} width={100} height={100} alt="Logo" />
        </div>
        <div className="flex flex-row gap-4 items-center">
          <button onClick={goToHome}>
            <h1 className="text-xl font-serif text-white">Home</h1>
          </button>
          <button
            onClick={handleSignIn}
            className="px-6 py-2 bg-white text-black hover:bg-gray-300 rounded-3xl"
          >
            Sign&nbsp;In
          </button>
        </div>
      </div>

      {/* Sign-In Section */}
      <div className="flex flex-col p-5 bg-black">
        <button
          onClick={handleSignIn}
          className="px-4 py-2 bg-[#0F2819] text-gtext rounded hover:bg-[#000F0A]"
        >
          Sign In
        </button>
      </div>

      {/* Teams Section */}
      <div
        ref={teamsRef}
        id="teams"
        className="mt-10 flex flex-col justify-center items-center"
      >
        <div className="p-9 justify-evenly">
          {/* Heading and Buttons */}
          <div className="flex flex-col items-center">
            {/* Heading */}
            <h1 className="text-4xl font-serif text-gtext text-center mb-6">
              Our Team
            </h1>
            {/* Buttons */}
            <div className="button-container">
              <button
                onClick={() => handleTeamSwitch("execome")}
                className={clsx("btn", { "active": activeButton === "execome" })}
              >
                Execome
              </button>
              <button
                onClick={() => handleTeamSwitch("web")}
                className={clsx("btn", { "active": activeButton === "web" })}
              >
                Web Team
              </button>
            </div>
          </div>
          <br />

          {/* Team Member Cards */}
          <div className="w-full flex justify-evenly">
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 justify-evenly">
    {Team.map((member) => (
      <div
        key={member.id}
        className={clsx(
          "bg-gray-800 justify-evenly p-4 rounded-xl transform transition duration-300 hover:scale-105",
          { "opacity-0 translate-y-8": !isActive }, // Hidden state
          {
            "opacity-100 justify-evenly translate-y-0 transition-all duration-700 ease-in-out delay-0":
              isActive,
          } // Visible state
        )}
      >
        <Image
          src={member.imgURL || logo}
          className="rounded-lg"
          alt={member.name}
        />
        <h2 className="text-lg font-semibold text-green-400 text-center">
          {member.name}
        </h2>
        <p className="text-white text-center">{member.role}</p>
      </div>
    ))}
  </div>
</div>


          {/* Background Image */}
          <Image
            className="-z-50 fixed bottom-0 right-0"
            src={intro}
            alt="Logo"
          />
        </div>
      </div>
    </>
  );
}

export default Teams;
