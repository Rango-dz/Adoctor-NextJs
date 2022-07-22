import React, { useEffect, useState } from 'react'
import sanityClient from "../../../lib/client.js";
import Skeleton from 'react-loading-skeleton'
import SVG from 'react-inlinesvg';

export default function SectionServices(props) {


  const allPostsData = props.sectionService;

  if (!allPostsData) {
    return (
      <div className="my-20 mx-[5%]">
        <Skeleton circle={true} />
        <Skeleton count={3} />
      </div>
    )
  }


  return (


    <section className="md:my-[15%] my-[45%] relative w-auto flex flex-col justify-center align-middle bg-gradient-to-tr from-slate-50 to-slate-200 dark:bg-gradient-to-tr dark:to-moroi-dark dark:from-moroi-dark mx-[5%] md:mx-[10%] items-center rounded-lg">
      <div className='flex flex-col justify-around my-10 mx-[5%]'>
        <div>
          <h1 className='text-4xl font-bold tracking-tight text-heading lg:text-5xl flex mb-5'> Our Departments</h1>
        </div>
        <div>
          <h3 className='lead-tight text-lg tracking-tight text-heading lg:text-xl text-colorOne dark:text-colorRed'>We provide Best Doctor</h3>
          <p className='text-heading lg:text-base xl:text-lg leading-tight text-slate-500 text-start'>Consult Our Doctors For Any Health Concern</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-center align-middle gap-5 mx-auto px-[5%] mb-20">

        {allPostsData &&
          allPostsData.map((item, index) => {


            return (
              <div key={index} className="max-w-md mx-auto bg-white dark:bg-moroi-stack rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                  <div className="md:shrink-0">
                    <SVG
                      description={item.title}
                      data-aos="zoom-up"
                      data-aos-duration="500"
                      className="h-48 w-full md:h-full md:w-32 p-8 lg:w-48 lg:p-14 dark:fill-colorRed fill-colorOne"
                      src={item.image.asset.url}
                      alt={item.title} />

                  </div>
                  <div className="p-4 md:p-8">
                    <div className="uppercase tracking-wide text-sm text-colorOne dark:text-colorRed font-semibold">{item.title}</div>
                    <p className="block mt-1 text-lg leading-tight font-medium text-black dark:text-white">Dr. {item.doc.name}</p>
                    <p className="mt-2 text-slate-500 dark:text-white font-light">{item.text[0].children[0].text}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </section>
  )
}
