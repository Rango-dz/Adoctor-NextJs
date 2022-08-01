import Image from 'next/image';
import React from 'react';
import Skeleton from 'react-loading-skeleton';


function Hero(props) {


  const heading = props.aboutHero

  if (!heading) {

    return (
      <div className='dark:bg-moroi-dark w-1/4'>
        <Skeleton count={1} height={50} width={200} className='dark:bg-moroi-dark' />
      </div>
    )
  }
  return (
    <>
      <div data-row-header="bottom" className='header block h-[80vh]'>
        <div className="relative  grid justify-between py-[5%] px-[5%] md:px-[10%] pb-0 grid-cols-1 md:grid-cols-5 align-middle gap-5 md:gap-10 lg:gap-20 ">
          <div className='lg:mx-[5%] w-full max-w-7xl col-span-3'>
            <h2
              data-aos="zoom-out-right"
              data-aos-duration="500"
              className='text-4xl font-bold tracking-tight text-heading md:text-5xl my-4'>{heading.AboutHeading}
            </h2>
          </div>

          <div className="mx-auto w-full bg-white dark:bg-moroi-stack col-span-2 p-5 rounded self-center place-content-center">
            <p
              data-aos="zoom-out-right"
              data-aos-duration="500"
              className='text-heading lg:text-base xl:text-lg'>{heading.AboutSubtitle}</p>
          </div>

        </div>
        <div
          className="text-center mx-auto w-2/3 hidden md:block">

          <Image
            data-aos="fade-up"
            data-aos-duration="500"
            src={heading.aboutImage.asset.url} alt="" layout='responsive' width={600} height={220} className="object-contain" priority="true" />

        </div>
      </div>
    </>
  )
}

export default Hero;