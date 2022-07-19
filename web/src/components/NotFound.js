import React from 'react'
import notFound from '../assets/images/NotFound.png';
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className='m-[15%] grid grid-cols-1 md:grid-cols-2'>
      <div className=' flex flex-col justify-center align-start w-full relative'>
        <Image src={notFound} layout="fill" alt="" className='object-cover w-1/2 self-center md:w-full relative' />
      </div>

      <div className='flex flex-row md:flex-col justify-center align-middle col-span-1 font-bold text-3xl md:text-7xl lg:text-9xl capitalize my-[15%] md:mb-0 gap-2'>
        <span className=''>404</span>
        <span>Page not found</span>
      </div>
    </div>
  )
}
