import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';
import { GiFiles } from 'react-icons/gi';
import { BsChevronRight } from 'react-icons/bs';
import sanityClient from "../../../lib/client.js";
import BlockContent from "@sanity/block-content-to-react";
import Image from 'next/image'

export default function SectionArticles(props) {

  const allPostsData = props.posts;
  const Title_LENGTH = 80;



  return (
    <section className='mx-[5%] md:mx-[10%] md:my-[15%] my-[45%]'>
      <div className="flex justify-between">
        <h1 className='text-start text-lg font-bold hover:underline'><Link href="/Articles" alt="Doctors articles" className='flex'><a>Popular Articles <GiFiles /></a></Link></h1>
        <Link href="/Articles" alt="Doctors articles" className='border border-slate-200 rounded-full p-2 bg-slate-200 cursor-pointer shadow hover:shadow-md text-slate-500 text-center self-center hover:bg-slate-300'><a><BsChevronRight /></a></Link>
      </div>
      <Swiper
        breakpoints={{
          // when window width is >= 320px
          640: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          // when window width is >= 480px
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          // when window width is >= 640px
          1024: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          1224: {
            slidesPerView: 4,
            spaceBetween: 10
          },
          1324: {
            slidesPerView: 5,
            spaceBetween: 10
          },

        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }
        }
        className="my-14"
      >
        {allPostsData &&
          allPostsData.map((item, index) => {
            return (
              <SwiperSlide
                key={crypto.randomUUID()}
                className='my-5'>
                <div className=" max-w-md md:mx-auto bg-white dark:bg-moroi-dark dark:border-moroi-gray dark:shadow rounded-xl shadow-[0_5px_20px_0_rgba(63,171,243,0.2)] overflow-hidden   border custom-glass ">
                  <div className="">
                    <div className="md:shrink-0 relative">
                      <Image className="h-48 w-full object-cover rounded relative" src={item.mainImage.asset.url} layout="responsive" width={250} height={150} alt={item.title}></Image>

                    </div>
                    <div className="p-4 md:p-8">
                      {
                        item.title.length > Title_LENGTH ?
                          (
                            <Link href={"/article/" + item.slug.current} className="uppercase tracking-wide text-sm  font-semibold hover:underline" dangerouslySetInnerHTML={{ __html: item.title.substring(0, Title_LENGTH) }}><a>{item.title}</a></Link>
                          ) :
                          <Link href={"/article/" + item.slug.current} className="uppercase tracking-wide text-sm  font-semibold hover:underline" dangerouslySetInnerHTML={{ __html: item.title.substring(0, Title_LENGTH) }}><a>{item.title}</a></Link>
                      }
                      <div className="md:max-h-20 md:max-w-20 text-ellipsis overflow-hidden  prose my-2 dark:text-white font-light" >
                        <BlockContent blocks={item.body} projectId={sanityClient.projectId} dataset={sanityClient.dataset} />
                        {/* {truncate(item.body, 150)} */}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })
        }

      </Swiper>
    </section>
  )
}