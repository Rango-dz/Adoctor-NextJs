import React, { useEffect, useState, useCallback } from "react";
import Link from 'next/link'
import sanityClient from "../../lib/client";
import { PortableText } from '@portabletext/react'
import { formatPhoneNumber, slugify } from '../../lib/helpers';
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react';
import { GiClockwork, GiFirstAidKit, GiMale, GiModernCity, GiPhone, GiPositionMarker } from "react-icons/gi";
import { useLoadScript } from "@react-google-maps/api";
import Googlemap from '../../src/components/Doctors/googleMap';
import Skeleton from 'react-loading-skeleton'
import Head from 'next/head'
import Image from 'next/image'
import dynamic from "next/dynamic";
import { siteSettings } from "../../lib/api";
import Script from "next/script";

const HeaderTop = dynamic(() => import('../../src/components/Header/headerTop'), {})
const HeaderMiddle = dynamic(() => import('../../src/components/Header/headerMiddle'), {})
const Footer = dynamic(() => import('../../src/components/Footer/footer'), {})
const ScrollToTop = dynamic(() => import('../../src/components/ScrollToTop'), {})



export default function OnePost({ doctor, data }) {

  //googlemap
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY // Add your API key
  });

  const siteSettings = data[0];

  const docData = doctor;


  const [today, setToday] = useState(new Date());

  const getTodayName = useCallback(() => {
    const options = { weekday: 'long' };
    const openDay = new Date().toLocaleDateString(undefined, options)
    setToday(openDay);
  }, []);

  useEffect(() => {
    getTodayName();
  }, []);



  if (!doctor) return (
    <div><Skeleton count={1} className='dark:bg-moroi-dark' /></div>
  )



  return (
    <>
      <Head>
        <Script type="application/ld+json"
          dangerouslySetInnerHTML={`
          {
          "@context": "https://schema.org",
          "@type": "Physician",
          "name": ${docData.name},
          "image": ${docData.image.asset.url},
          "@id": ${docData.website},
          "url": ${docData.website},
          "telephone": ${docData.phoneNumber},
          "address": {
            "@type": "PostalAddress",
            "streetAddress": ${docData.Office && docData.Office},
            "addressLocality": ${docData.city && docData.city},
            "postalCode": ${docData.zipcode && docData.zipcode},
            "addressCountry": ${docData.country && docData.country}
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": ${docData.location.lat},
            "longitude": ${docData.location.lng}
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            ${docData && docData.openingHours.map((day, index) => {
            return `"dayOfWeek": ["${day.day}"],  "opens":"${day.opensAt}", "closes":"${day.closesAt}"`

          }
          )}
          }
        }
          `}
        />
        <title>{`${slug} ${siteSettings.title} `}</title>
      </Head>
      <header id="header" className="ct-header">
        <HeaderTop headertop={siteSettings} />
        <HeaderMiddle headermiddle={siteSettings} />
      </header>
      <div className="grid grid-cols-1 md:grid-cols-8 my-[5%] mx-[5%] md:mx-[10%] place-content-around gap-5">
        <div className="col-span-5">
          <div className="flex flex-col lg:flex-row my-5">
            <div className="md:w-80 relative">
              {/* docotr image */}
              <Image
                src={docData.image.asset.url}
                layout="responsive"
                width={320}
                height={200}
                alt={docData.name}
                className="rounded bg-white shadow-blueShadow border-2 border-white object-cover aspect-video relative"></Image>
            </div>
            <div className="flex flex-col relative mx-2 my-5 md:my-2">
              <span className="text-colorOne dark:text-colorRed flex mb-2"><GiMale className="self-center mr-2" /> {
                // eslint-disable-next-line
                docData.Speicialties || <span className="text-sm font-normal">Unknown</span>}</span>
              {/* Doctor name */}
              <Link href={`/doctor/${docData.slug.current}`}
                className="text-lg font-semibold flex mb-2"><a className="flex"><GiFirstAidKit className="self-center mr-2" />{docData.name || <span className="text-sm font-normal">Unknown</span>}</a>
              </Link>


              <span className="flex mb-2"><GiMale className="self-center mr-2" />{docData.Gender || <span className="text-sm p-1 indent-5 font-normal">Unknown</span>}</span>

              <span className="flex mb-2"><GiModernCity className="self-center mr-2" />{docData.City || <span className="text-sm font-normal">Unknown</span>}</span>
              {/* phone number */}
              <a href={`tel:${docData.phoneNumber}`} className="flex mb-2 bg-colorSix dark:bg-moroi-dark p-1 rounded w-fit no-underline cursor-pointer hover:bg-colorFive"><GiPhone className="self-center mr-2" />{formatPhoneNumber(docData.phoneNumber) || <span className="text-sm font-normal">Unknown</span>}</a>
            </div>
          </div>

          <div className="my-10 ">
            <Tabs value="Overview" className="">

              <TabsHeader className="flex flex-col md:flex-row bg-colorSix">
                <Tab key='Overview' value='Overview' className='p-5'>
                  <span className='flex gap-1 font-semibold'><GiFirstAidKit className='text-colorOne dark:text-colorRed self-center text-3xl' />Overview</span>
                </Tab>
                <Tab key='Experience' value='Experience' className='p-5'>
                  <span className='flex gap-1 font-semibold'><GiClockwork className='text-colorOne dark:text-colorRed self-center text-3xl' />Experience</span>
                </Tab>
                <Tab key='Location' value='Location' className='p-5'>
                  <span className='flex gap-1 font-semibold'><GiPositionMarker className='text-colorOne dark:text-colorRed self-center text-3xl' />Location</span>
                </Tab>
              </TabsHeader>


              <TabsBody className="bg-colorSeven dark:bg-moroi-dark m-2 shadow-blueShadow drop-shadow-topheader rounded mx-auto border border-white dark:border-moroi-gray ">
                <TabPanel key='Overview' value='Overview'>
                  <div className="prose-base prose-headings:prose-2xl prose-headings:font-semibold prose-headings:underline prose-li:list-disc p-5 md:p-10 font-normal dark:text-white text-colorThree">
                    <PortableText
                      value={docData.text || <span className="text-sm p-1 indent-5 font-normal">Unknown</span>}
                      projectId={sanityClient.projectId}
                      dataset={sanityClient.dataset}
                      components={{
                        block: {
                          // Customize block types with ease
                          h1: ({ children }) => <h1 id={slugify(children)} className="text-3xl"><a href={`#${slugify(children)}`}>{children}</a></h1>,
                          h2: ({ children }) => <h2 id={slugify(children)} className="text-2xl"><a href={`#${slugify(children)}`}>{children}</a></h2>,
                          h3: ({ children }) => <h3 id={slugify(children)} className="text-xl"><a href={`#${slugify(children)}`}>{children}</a></h3>,
                        },
                        Text: {
                          // Customize text types with ease
                          strong: ({ children }) => <strong>{children}</strong>,
                          em: ({ children }) => <em>{children}</em>,
                          a: ({ children, href }) => <a href={href}>{children}</a>,
                          p: ({ children }) => <p className="w-full mx-auto">{children}</p>,
                          ul: ({ children }) => <ul>{children}</ul>,
                          li: ({ children }) => <li className="list-disc">{children}</li>,
                          ol: ({ children }) => <ol>{children}</ol>,
                          blockquote: ({ children }) => <blockquote>{children}</blockquote>,
                          hr: () => <hr />,
                          table: ({ children }) => <table>{children}</table>,
                          thead: ({ children }) => <thead>{children}</thead>,
                          tbody: ({ children }) => <tbody>{children}</tbody>,
                          tr: ({ children }) => <tr>{children}</tr>,
                          th: ({ children }) => <th>{children}</th>,
                          td: ({ children }) => <td>{children}</td>,
                          code: ({ children }) => <code>{children}</code>,
                          pre: ({ children }) => <pre>{children}</pre>,
                          inlineCode: ({ children }) => <code>{children}</code>,
                        }
                      }}
                    />
                  </div>
                </TabPanel>
                <TabPanel key='Experience' value='Experience' className="dark:text-white text-colorThree">
                  <h3 className="text-base font-semibold p-3">Spoken Lnaguages:</h3>
                  { // eslint-disable-next-line
                    docData.Languages.map((award, index) => (
                      <ul key={index} className="text-sm p-1 indent-5 font-normal">
                        <li key={index}>{award.value}</li>
                      </ul>
                    )) || <span className="text-sm p-1 indent-5 font-normal">Unknown</span>}

                  <h3 className="text-base font-semibold p-3">Services :</h3>
                  { // eslint-disable-next-line
                    docData.Services.map((award, index) => (
                      <ul key={index} className="text-base p-1 indent-5 font-normal">
                        <li key={index}>{award.value}</li>
                      </ul>
                    )) || <span className="text-sm p-1 indent-5 font-normal">Unknown</span>}

                  <h3 className="text-base font-semibold p-3">Education :</h3>
                  { // eslint-disable-next-line
                    docData.Education.map((award, index) => (
                      <ul key={index} className="text-sm p-1 indent-5 font-normal">
                        <li key={index}>{award.value}</li>
                      </ul>
                    ))}

                  <h3 className="text-base font-semibold p-3">Awards :</h3>
                  { // eslint-disable-next-line 
                    docData.Awards && docData.Awards.map((award, index) => (
                      <ul key={index} className="text-sm p-1 indent-5 font-normal">
                        <li key={index}>{award.value}</li>
                      </ul>
                    ))// eslint-disable-next-line
                    || <span className="text-sm p-1 indent-5 font-normal">Unknown</span>}

                </TabPanel>
                <TabPanel key='Location' value='Location' className="dark:text-white text-colorThree">

                  <h3 className="text-base font-semibold p-3">Office: </h3>
                  <span className="flex indent-5 p-1">{docData.Office || <span className="text-sm p-1 indent-5 font-normal">Unknown</span>}</span>
                  <h3 className="text-base font-semibold p-3">Opening Hours:</h3>
                  <ul>
                    {// eslint-disable-next-line
                      docData.openingHours && docData.openingHours.map((award, index) => (

                        <div key={index} className="bg-white dark:bg-moroi-stack dark:bg-opacity-75 grid grid-cols-2 justify-start align-middle  max-w-sm p-2 rounded shadow hover:bg-slate-50 dark:hover:bg-moroi-stack hover:shadow-md m-2 ">
                          <div className={today === award.day ? "relative text-colorOne dark:text-colorRed font-medium border-r p-1 before:absolute before:z-10 before:-left-2 before:top-0 before:bottom-0 before:block before:content-[''] before:w-1 before:rounded-tr-full before:rounded-br-full before:bg-colorOne dark:before:bg-colorRed " : "font-medium border-r p-1 "}>{award.day}</div>
                          <div className={today === award.day ? 'text-colorOne dark:text-colorRed font-medium p-1 text-center' : 'font-medium p-1 text-center'}>{award.opensAt} - {award.closesAt}</div>
                        </div>

                      ))// eslint-disable-next-line
                      || <span className="text-sm p-1 indent-5 font-normal">Unknown</span>}
                  </ul>
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
        </div>
        <div className="col-span-1 hidden md:block"></div>
        <div className="col-span-2 m-1 w-full place-content-center justify-center">


          {isLoaded ? <Googlemap docData={docData} /> : null}


        </div>
      </div>
      <ScrollToTop />
      <Footer footerSettings={siteSettings} />
    </>
  );
}

export async function getServerSideProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params
  const doctor = await sanityClient.fetch(`
    *[_type == "doctor" && slug.current == $slug]{
  "image":mainImage{
          asset->{
          url
        }
      },
...
}[0]
  `, { slug })
  const data = await siteSettings();
  return {
    props: {
      doctor,
      data
    }
  }
}