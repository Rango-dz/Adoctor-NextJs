import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import AOS from 'aos';
import "aos/dist/aos.css";


import { getAlldata } from '../lib/api';


const Appointments = dynamic(() => import('../src/components/Home/Appointments'), {});
const HeaderBottom = dynamic(() => import('../src/components/Header/headerBottom'), {});
const SectionServicesOne = dynamic(() => import('../src/components/Home/SectionServicesOne'), {});
const SectionDoctor = dynamic(() => import('../src/components/Home/SectionDoctor'), {});
const SectionServices = dynamic(() => import('../src/components/Home/SectionServices'), {});
const SectionReview = dynamic(() => import('../src/components/Home/SectionReview'), {});
const SectionArticles = dynamic(() => import('../src/components/Home/SectionArticles'), {});
const HeaderTop = dynamic(() => import('../src/components/Header/headerTop'), {})
const HeaderMiddle = dynamic(() => import('../src/components/Header/headerMiddle'), {})
const Footer = dynamic(() => import('../src/components/Footer/footer'), {})
const ScrollToTop = dynamic(() => import('../src/components/ScrollToTop'), {})


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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="dns-prefetch" href="cdn.sanity.io" />
        <meta name="title" content={siteSettings.title} />
        <meta name="description" content={siteSettings.description} />
        <meta name="keywords" content={siteSettings.keywords} />

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
        <header id="header" className="ct-header">
          <HeaderTop headertop={siteSettings} />
          <HeaderMiddle headermiddle={siteSettings} />
        </header>
        <HeaderBottom herohome={data.herohome} handleOpen={handleOpen} />
        <SectionServicesOne serviceOne={data.serviceOne} />
        <Appointments open={open} handleOpen={handleOpen} />
        <SectionDoctor doctorSettings={doctorSettings} />
        <SectionServices sectionService={data.sectionService} />
        <SectionReview sectionReview={data.sectionReview} />
        <SectionArticles posts={data.allPostsData} />

        <ScrollToTop />
        <Footer footerSettings={siteSettings} />
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

  }
}