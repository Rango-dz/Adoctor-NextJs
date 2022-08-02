import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import AOS from 'aos';
import "aos/dist/aos.css";
import HeaderBottom from '../src/components/Header/headerBottom'
import HeaderTop from '../src/components/Header/headerTop';
import HeaderMiddle from '../src/components/Header/headerMiddle';
import Appointments from '../src/components/Home/Appointments'
// import SectionServicesOne from '../src/components/Home/SectionServicesOne';
// import SectionDoctor from '../src/components/Home/SectionDoctor';
// import SectionServices from '../src/components/Home/SectionServices';
// import SectionReview from '../src/components/Home/SectionReview'
// import SectionArticles from '../src/components/Home/SectionArticles'
import { getAlldata, siteSettings } from '../lib/api';


const SectionServicesOne = dynamic(() => import('../src/components/Home/SectionServicesOne'), {});
const SectionDoctor = dynamic(() => import('../src/components/Home/SectionDoctor'), {});
const SectionServices = dynamic(() => import('../src/components/Home/SectionServices'), {});
const SectionReview = dynamic(() => import('../src/components/Home/SectionReview'), {});
const SectionArticles = dynamic(() => import('../src/components/Home/SectionArticles'), {});
// const Appointments = dynamic(() => import('../src/components/Home/Appointments'), {});
// const HeaderBottom = dynamic(() => import('../src/components/Header/headerBottom'), {});
// const HeaderTop = dynamic(() => import('../src/components/Header/headerTop'), {})
// const HeaderMiddle = dynamic(() => import('../src/components/Header/headerMiddle'), {})
const Footer = dynamic(() => import('../src/components/Footer/footer'), {})
const ScrollToTop = dynamic(() => import('../src/components/ScrollToTop'), {})


export default function Home({ data, settings }) {

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
  const siteSettings = settings[0];
  const doctorSettings = data.doctorSettings[0];


  return (
    <>
      <Head>
        <meta name="title" content={siteSettings.title} />
        <meta name="description" content={siteSettings.description} />
        <meta name="keywords" content={siteSettings.keywords} />

        <script type="application/ld+json">{`
          {
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          "name": ${siteSettings.title},
          "image": ${siteSettings.socialimage.asset.url},
          "@id": ${siteSettings.Website},
          "url": ${siteSettings.Website},
          "telephone": ${siteSettings.phoneNumber},
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
        <header id="header" className="ct-header">
          <HeaderTop headertop={siteSettings} />
          <HeaderMiddle headermiddle={siteSettings} />
        </header>
        <HeaderBottom herohome={settings[0]} handleOpen={handleOpen} />
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
  const settings = await siteSettings();
  return {
    props: {
      data,
      settings
    },

  }
}