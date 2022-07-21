import React, { useState } from 'react';
import { GiHeartBeats } from 'react-icons/gi'
import { FaSyringe, FaCalendarAlt } from 'react-icons/fa';
import { GiHealthNormal, GiMedicinePills } from 'react-icons/gi';
import Skeleton from 'react-loading-skeleton';
import { useEffect } from 'react';
import Image from 'next/image';
import sanityClient from "../../client";


export default function HeaderBottom(props) {

  const [heading, setHeading] = useState();

  const mainHeroHeading = async () => {
    const response = sanityClient.fetch(
      `* [_type == "HeroHeading"]{
        'homeImage': HomeImage{ asset->{ url } },
        HomeHeading,
        HomeSubtitle,
        Hometext,
  }`
    );
    const data = await response;
    setHeading(data[0]);
  }


  useEffect(() => {
    mainHeroHeading();
  }, []);

  if (!heading) {

    return (
      <Skeleton count={1} height={50} width={200} />
    )
  }
  return (
    <>
      <div data-row-header="bottom" className="relative header grid justify-between py-[5%] px-[2%] md:px-[10%] pb-0 grid-cols-1 md:grid-cols-2 align-middle gap-10">
        <div className='mx-auto px-8 lg:mx-[5%] w-full lg:align-top lg:self-start relative'>
          <div>
            <h2
              data-aos="zoom-out-right"
              data-aos-duration="500"
              className='text-4xl font-bold tracking-tight text-heading lg:text-5xl xl:text-6xl my-4'>{heading.HomeHeading}</h2>
            <h2
              data-aos="zoom-out-right"
              data-aos-duration="500"
              className='text-4xl font-bold tracking-tight text-heading lg:text-5xl xl:text-6xl my-4'>{heading.HomeSubtitle}</h2>
            <p
              data-aos="zoom-out-right"
              data-aos-duration="500"
              className='text-heading lg:text-base xl:text-lg'>{heading.Hometext}</p>
          </div>

          <button
            onClick={() => props.handleOpen()}

            className='my-10 flex gap-2 shadow-md rounded-lg p-4  bg-colorTwo dark:bg-colorRed dark:hover:bg-moroi-pinkdanger text-lg font-medium text-white  hover:bg-colorOne hover:shadow' ><FaCalendarAlt className='self-center' />Make an Appointment
          </button>

        </div>
        <div
          className="h-[50vh] md:h-[60vh] w-full mb-0 flex flex-col relative bg-cover"
        >

          <div className='flex justify-between relative bottom-10 left-0 md:top-0 md:right-0 gap-10'>
            <GiHeartBeats className='text-6xl text-red-500 border-1 p-1 rounded bg-gray-100 bg-opacity-5 shadow-md opacity-30 backdrop-blur-md backdrop-saturate-100 border-[rgba(255,255,255,0.3)]  self-end animate-pulse  absolute top-1/2 right-1/3 md:right-1/3 md:top-1/3' />

            <FaSyringe className='text-6xl text-blue-500 border-1 p-2 rounded bg-slate-50 bg-opacity-5 shadow-md opacity-30 backdrop-blur-md backdrop-saturate-100 border-[rgba(255,255,255,0.3)]  animate-pulse  absolute -bottom-10 left-28 md:left-1/3 md:bottom-1/3' />

            <GiHealthNormal className='text-6xl text-cyan-500 border-1 p-2 rounded bg-slate-50 bg-opacity-[.2] shadow-md opacity-30 backdrop-blur-md backdrop-saturate-100 border-[rgba(255,255,255,0.3)] self-end animate-pulse  absolute top-20 left-0 md:right-1/4 md:bottom-1/4' />

            <GiMedicinePills className='text-6xl text-violet-500 border-1 p-2 rounded bg-slate-50 bg-opacity-[.2] shadow-md opacity-30 backdrop-blur-md backdrop-saturate-100 border-[rgba(255,255,255,0.3)] self-star animate-pulse absolute -bottom-36 right-5 md:left-1/4 md:top-1/4' />
          </div>


          <Image
            data-aos="fade-left"
            data-aos-duration="500"
            src={heading.homeImage.asset.url} alt="hero" layout='responsive' width={600} height={600} className="object-contain" priority="true" />


        </div>
      </div>
    </>
  )
}
