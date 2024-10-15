import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <section className='flex-1 w-full h-full'>
      <hr className='border-gtext mx-6 my-12' />
      <h1 className='inter text-center lg:text-6xl text-5xl'>Contact Us</h1>
      
      <div className='flex flex-col lg:flex-row w-full justify-between my-8'>
        <address className='not-italic'>
          <h3 className='inter text-gtext text-3xl m-3 mx-12'>asmecet@cet.ac.in</h3>
          <h3 className='inter text-gtext text-3xl m-3 mx-12'>+91 987654321</h3>
        </address>
        
        <div>
          <h3 className='inter text-3xl m-3 mx-12'>@amseinsta</h3>
          <h3 className='inter text-3xl m-3 mx-12'>@asmeyoutube</h3>
        </div>
      </div>
      
      <h1 className='inter text-center m-3'>@ASMECET 2024</h1>
      <hr className='border-gtext mx-6 mb-12' />
    </section>
  );
}

export default Contact;
