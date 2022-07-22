import React, { useState, useEffect } from 'react'
import HeaderBottom from "../src/components/Header/headerBottom";
import Head from 'next/head'
import Appointments from "../src/components/Home/Appointments";
import AOS from 'aos';
import "aos/dist/aos.css";
import SectionDoctor from "../src/components/Home/SectionDoctor";
import SectionServices from "../src/components/Home/SectionServices";
import SectionServicesOne from "../src/components/Home/SectionServicesOne";
import SectionReview from "../src/components/Home/SectionReview";
import SectionArticles from "../src/components/Home/SectionArticles";
import Skeleton from 'react-loading-skeleton'
import { getAlldata } from '../lib/api';

export default function Home({ data }) {

  console.log(data);
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


  if (!siteSettings || !doctorSettings) {
    return (
      <div className="my-20 m-[10%] flex flex-col mx-auto">
        <div><Skeleton circle={true} className='dark:bg-moroi-dark' /></div>
        <div><Skeleton count={3} className='dark:bg-moroi-dark' /></div>
      </div>

    )
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" Lang='en' />
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

        <title>{siteSettings.title}</title>
        <meta name="title" content={siteSettings.title} />
        <meta name="description" content={siteSettings.description} />
        <meta name="KEYWORDS" content={siteSettings.keywords} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteSettings.website} />
        <meta property="og:title" content={siteSettings.title} />
        <meta property="og:description" content={siteSettings.description} />
        <meta property="og:image" content={siteSettings.socialimage.asset.url} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={siteSettings.website} />
        <meta property="twitter:title" content={siteSettings.title} />
        <meta property="twitter:description" content={siteSettings.description} />
        <meta property="twitter:image" content={siteSettings.socialimage.asset.url} />
      </Head>
      <div id="main" className="dark:bg-moroi-back main-container" >

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