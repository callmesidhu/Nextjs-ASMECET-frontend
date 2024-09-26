import React from 'react';
import './Contact.css'

function Contact() {
  return (
    <div className='flex-1 w-full h-full'>
      <hr className='border-gtext mx-6 my-12'></hr>
      <h1 className='inter text-center text-6xl'>Contact Us</h1>
      <div className='flex-row flex w-full justify-between'>
        <div>
          <h3 className='inter text-gtext text-3xl m-3 mx-12'>asmecet@cet.ac.in</h3>
          <h3 className='inter text-gtext text-3xl m-3 mx-12'>+91 987654321</h3>
        </div>
        <div>
         <h3 className='inter text-3xl m-3 mx-12'>@amseinsta</h3>
         <h3 className='inter text-3xl m-3 mx-12'>@asmeyoutube</h3>
        </div>
      </div>
      <h1 className='inter text-center m-3'>@ASMECET 2024</h1>
      <hr className='border-gtext mx-6 mb-12'></hr>
    </div>
  )
}

export default Contact
