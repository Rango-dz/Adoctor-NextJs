import Header from "../src/components/Header/header";
import Footer from "../src/components/Footer/footer";
import React, { useState, useEffect } from 'react'
import HeaderBottom from "../src/components/Header/headerBottom";
import Head from 'next/head'
import Appointments from "../src/components/Home/Appointments";
import ScrollToTop from '../src/components/ScrollToTop';
import AOS from 'aos';
import "aos/dist/aos.css";
import SectionDoctor from "../src/components/Home/SectionDoctor";
import SectionServices from "../src/components/Home/SectionServices";
import SectionServicesOne from "../src/components/Home/SectionServicesOne";
import SectionReview from "../src/components/Home/SectionReview";
import SectionArticles from "../src/components/Home/SectionArticles";
import sanityClient from "../src/client";
import Skeleton from 'react-loading-skeleton'


export default function Home() {


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
  const [siteSettings, setSiteSettings] = useState();
  const [doctorSettings, setDoctorSiteSettings] = useState();
  const [heroHeading, setheroHeading] = useState();

  const mainHeroHeading = async () => {
    const response = sanityClient.fetch(
      `* [_type == "HeroHeading"]{
        'docImage': DoctorImage{ asset->{ url } },
        'homeImage': HomeImage{ asset->{ url } },
        DoctorsHeading,
        DoctorsSubtitle,
        HomeHeading,
        HomeSubtitle,
        Hometext,
  }`
    );
    const data = await response;
    setheroHeading(data[0]);
  }

  const mainDoctorSettings = async () => {
    const response = sanityClient.fetch(
      `  * [_type == "TheDoctor"]{
    "image":mainImage{ asset -> { url } },
...
  }`
    );
    const data = await response;
    setDoctorSiteSettings(data[0]);
  }

  const allSettings = async () => {
    const response = sanityClient.fetch(
      `*[_type == "siteSettings"]{
  "logoimage":logo{asset->{url}},
  "logoDarkimage":logoDark{asset->{url}},
  "socialimage":image{asset->{url}},
...
}`
    );
    const data = await response;
    setSiteSettings(data[0]);
  }


  useEffect(() => {
    allSettings();
    mainDoctorSettings();
    mainHeroHeading();
  }, []);

  if (!siteSettings || !doctorSettings || !heroHeading) {
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

        <HeaderBottom heroHeading={heroHeading} handleOpen={handleOpen} />

        <SectionServicesOne />
        <Appointments open={open} handleOpen={handleOpen} />
        <SectionDoctor doctorSettings={doctorSettings} />
        <SectionServices />
        <SectionReview />
        <SectionArticles />


      </div>
    </>
  )
}