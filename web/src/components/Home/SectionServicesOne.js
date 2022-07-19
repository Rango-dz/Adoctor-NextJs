import React, { useEffect, useState } from 'react'
import sanityClient from "../../client.js";
import Skeleton from 'react-loading-skeleton'
import SVG from 'react-inlinesvg';

export default function SectionServicesOne() {

  const [allfeaturesData, setAllfeatures] = useState();

  const allfeatures = async () => {
    const response = sanityClient.fetch(
      `*[_type == "HomeFeatures"]{
        name,
        image{
          asset->{
          url
          }
        }
}`
    );
    const data = await response;
    setAllfeatures(data);
  }


  useEffect(() => {
    allfeatures();
  }, []);

  if (!allfeaturesData) {
    return (
      <div className="my-20 mx-[10%] w-1/4">
        <Skeleton circle={true} />
        <Skeleton count={3} />
      </div>
    )
  }

  return (
    <section className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center align-middle gap-1 md:gap-10 mx-auto -m-[4%] text-center px-[5%] md:px-[10%]">

        {allfeaturesData && allfeaturesData.map((item, index) => {
          return (
            <div
              description={item.title}
              key={index}
              data-aos="fade-up"
              data-aos-duration="500"
              className=" w-full h-28 rounded shadow-[0_5px_20px_0_rgba(63,171,243,0.2)] dark:shadow-[#232323] dark:hover:bg-gradient-to-bl custom-glass flex justify-center items-center text-xl font-bold hover:bg-gradient-to-bl dark:from-moroi-dark dark:to-moroi-dark from-slate-100 to-slate-200 cursor-pointer transition-custom  dark:text-colorSeven">
              <SVG

                src={item.image.asset.url}
                alt={item.name}
                className="text-5xl m-5 text-colorOne dark:text-colorRed w-16 fill-colorOne dark:fill-colorRed" />{item.name}
            </div>
          )
        })
        }
      </div>
    </section>
  )
}

