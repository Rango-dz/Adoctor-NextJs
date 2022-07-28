import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import AOS from 'aos';
import "aos/dist/aos.css";
// import HeaderTop from '../src/components/Header/headerTop';
// import HeaderMiddle from '../src/components/Header/headerMiddle';
// import HeaderBottom from "../src/components/Header/headerBottom";
// import SectionServicesOne from "../src/components/Home/SectionServicesOne";
// import SectionDoctor from "../src/components/Home/SectionDoctor";
// import SectionServices from "../src/components/Home/SectionServices";
// import SectionReview from "../src/components/Home/SectionReview";
// import SectionArticles from "../src/components/Home/SectionArticles";

import Skeleton from 'react-loading-skeleton'
import { getAlldata } from '../lib/api';


const Appointments = dynamic(() => import('../src/components/Home/Appointments'), { suspense: true, ssr: false });
const HeaderBottom = dynamic(() => import('../src/components/Header/headerBottom'), { suspense: true, ssr: false });
const SectionServicesOne = dynamic(() => import('../src/components/Home/SectionServicesOne'), { suspense: true, ssr: false });
const SectionDoctor = dynamic(() => import('../src/components/Home/SectionDoctor'), { suspense: true, ssr: false });
const SectionServices = dynamic(() => import('../src/components/Home/SectionServices'), { suspense: true, ssr: false });
const SectionReview = dynamic(() => import('../src/components/Home/SectionReview'), { suspense: true, ssr: false });
const SectionArticles = dynamic(() => import('../src/components/Home/SectionArticles'), { suspense: true, ssr: false });
const HeaderTop = dynamic(() => import('../src/components/Header/headerTop'), { suspense: true, ssr: false })
const HeaderMiddle = dynamic(() => import('../src/components/Header/headerMiddle'), { suspense: true, ssr: false })


export default function Home({ data }) {


  // initialize aos animation
  useEffect(() => {
    AOS.init();
  }, []);

  // state for appoitment form
  const [open, setOpen] = useState(true);

  // function for appoitment form (Toggle open close)
  const handleOpen = (value) => {
    const form = document.querySelector("#appointment");
    setOpen(!open);
    if (open) {
      form.classList.remove("hidden");
    } else if (!open) {
      form.classList.add("hidden");
    }
  }


  // fetching site seettings
  const siteSettings = data.siteSettings[0];
  const doctorSettings = data.doctorSettings[0];


  return (
    <>
      <Head>
        <script type="application/ld+json">{`
          {
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          "name": ${siteSettings.title},
          "image": ${siteSettings.socialimage},
          "@id": ${siteSettings.website},
          "url": ${siteSettings.website},
          "telephone": ${doctorSettings.phoneNumber},
          "address": {
            "@type": "PostalAddress",
            "streetAddress": ${doctorSettings.Address},
            "addressLocality": ${doctorSettings.city},
            "postalCode": ${doctorSettings.zipcode},
            "addressCountry": ${doctorSettings.Country}
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": ${doctorSettings.location.lat},
            "longitude": ${doctorSettings.location.lng}
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            ${doctorSettings && doctorSettings.openingHours.map((day, index) => {
          return `"dayOfWeek": ["${day.day}"],  "opens":"${day.opensAt}", "closes":"${day.closesAt}"`

        }
        )}
          `}
        </script>
      </Head>
      <div id="main" className="dark:bg-moroi-back main-container" >
        <HeaderTop />
        <HeaderMiddle />
        <HeaderBottom herohome={data.herohome} handleOpen={handleOpen} />
        <SectionServicesOne serviceOne={data.serviceOne} />
        <Appointments open={open} handleOpen={handleOpen} />
        <SectionDoctor doctorSettings={doctorSettings} />
        <SectionServices sectionService={data.sectionService} />
        <SectionReview sectionReview={data.sectionReview} />
        <SectionArticles posts={data.allPostsData} />


      </div>
    </>
  )
}

export async function getStaticProps() {
  const data = await getAlldata();
  return {
    props: {
      data
    },
    revalidate: 1
  }
}