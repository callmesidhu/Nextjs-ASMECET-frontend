import React from 'react'
import Image from 'next/image'
import logo from "public/logo.svg"

type Props = {}

const Asme = (props: Props) => {
  return (
    <>
    <div  className='flex flex-col md:flex-row justify-center items-center text-white pt-[38px] md:px-0 gap-[40px] md:gap-[80px]'>
        <div className='flex flex-col items-center justify-center pt-[50px] px-[30px]'>
            <Image src={logo} alt="ASME Logo" height={245}/>
        </div>
        <div className='flex flex-col gap-[20px]'>
            <p className='font-inder font-[300] text-[80px] text-center'>ASME-CET</p>
            <p className='font-inder text-base md:text-[20px] max-w-[740px] px-[28px] md:px-0'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed facilisis sapien. Aliquam vel lectus leo. Curabitur faucibus, metus sed eleifend bibendum, lacus diam rutrum nulla, et varius nulla justo eget nisi. Praesent accumsan nisl et nulla feugiat tempus. Phasellus non imperdiet turpis. Quisque sit amet neque vehicula, blandit lectus et, tempor est. Nulla sagittis a diam quis posuere. Praesent in sapien eget urna bibendum finibus quis eu enim. Integer nisi tellus, interdum eget dapibus sed, porta eu mauris. Nam sit amet metus ac sem bibendum lobortis. Nullam in massa at felis viverra tempus. Donec nec volutpat ante.
            </p>
        </div>
    </div>
    </>
  )
}

export default Asme