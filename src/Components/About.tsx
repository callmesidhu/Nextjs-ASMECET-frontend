import React from 'react';

type Props = {};

const About = (props: Props) => {
  return (
    <>
      <div id='about' className='flex w-full flex-col lg:flex-row items-center lg:mt-20'>
    
        <div className="bg-black h-auto py-1 lg:py-32 w-full lg:w-auto text-center lg:text-left">
          <h1 className="my-10 text-gtext text-5xl lg:text-7xl lg:-rotate-90 w-full lg:w-auto font-semibold">
            <i>About&nbsp;Us</i>
          </h1>
        </div>
        
        
        <div className='lg:ml-12'>
          <hr className='border-gtext mx-auto lg:mx-0 border-2 mb-8 lg:mb-12 w-3/4 lg:w-full' />
          <p className='text-base md:text-lg lg:text-2xl px-6 lg:px-12'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed facilisis sapien. Aliquam vel lectus leo. Curabitur faucibus, metus sed eleifend bibendum, lacus diam rutrum nulla, et varius nulla justo eget nisi. Praesent accumsan nisl et nulla feugiat tempus. Phasellus non imperdiet turpis. Quisque sit amet neque vehicula, blandit lectus et, tempor est. Nulla sagittis a diam quis posuere. Praesent in sapien eget urna bibendum finibus quis eu enim. Integer nisi tellus, interdum eget dapibus sed, porta eu mauris. Nam sit amet metus ac sem bibendum lobortis. Nullam in massa at felis viverra tempus. Donec nec volutpat ante.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
