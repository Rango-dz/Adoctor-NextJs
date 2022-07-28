import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from "swiper";
import Rating from '@mui/material/Rating';
import sanityClient from "../../../lib/client.js";
import Skeleton from 'react-loading-skeleton'
import Image from 'next/image'

export default function SectionReview(props) {

  const allreviewsData = props.sectionReview;


  if (!allreviewsData) {
    return (
      <div className="my-20 mx-[5%]">
        <Skeleton circle={true} />
        <Skeleton count={3} />
      </div>
    )
  }


  return (
    <section className='mx-[10%] md:my-[15%] my-[45%]'>
      <h1 className='text-4xl font-bold tracking-tight text-heading lg:text-5xl text-center'>What our patients say about our service</h1>
      <h3
        data-aos="fade-in"
        data-aos-duration="500"
        variant="lead" className='text-lg tracking-tight text-heading lg:text-xl font-semibold text-colorOne dark:text-colorRed antialiased text-center mt-5' > Trusted by 80,000+ Patient</h3>
      <Swiper
        spaceBetween={60}
        breakpoints={{
          // when window width is >= 320px
          640: {
            slidesPerView: 1,
            spaceBetween: 50
          },
          // when window width is >= 480px
          768: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          // when window width is >= 640px
          1024: {
            slidesPerView: 3,
            spaceBetween: 30
          },

        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }
        }
        modules={[Autoplay]}
        className="my-14"
      >
        {allreviewsData &&
          allreviewsData.map((review, key) => {
            return (
              <SwiperSlide
                key={key}
                className='dark:bg-moroi-dark w-1/3 dark:border-moroi-gray dark:shadow border rounded transition-custom h-full p-4 shadow-[0_5px_20px_0_rgba(63,171,243,0.2)] custom-glass my-2 mr-1'>
                <div className='flex flex-col md:flex-row gap-3 relative'>
                  <div className='h-16 w-16 rounded relative'>
                    <Image className='rounded' layout="responsive" width={43} height={43} src={review.image.asset.url} alt='review' />
                  </div>
                  <div className='flex flex-col'>
                    <span>{review.name}</span>
                    <Rating name="read-only" value={review.rating} readOnly />
                    <p className='overflow-hidden prose dark:text-white'>
                      {review.review}
                    </p>
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
