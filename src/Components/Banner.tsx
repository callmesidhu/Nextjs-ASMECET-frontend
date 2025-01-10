"use client"; // Add this line at the top

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

function Banner() {
  const images = [
    'https://i.pinimg.com/originals/cb/64/33/cb643340343d0f6259fdd7492d9fb000.jpg', // Replace with your image paths
    'https://i.pinimg.com/originals/cb/64/33/cb643340343d0f6259fdd7492d9fb000.jpg', // Replace with your image paths
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div id='achievements' className="relative w-full h-0 pb-[56.25%] overflow-hidden mt-16">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Slide ${index}`}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority={index === 0} // Load the first image with priority
          />
        </div>
      ))}
      <button
        onClick={handlePrevClick}
        aria-label="Previous Slide"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
      >
        &#9664;
      </button>
      <button
        onClick={handleNextClick}
        aria-label="Next Slide"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full focus:outline-none"
      >
        &#9654;
      </button>
    </div>
  );
}

export default Banner;
