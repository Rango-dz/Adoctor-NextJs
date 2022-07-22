import React, { useEffect, useState } from "react";
import Link from 'next/link'
import Pagination from '../../src/components/Pagination/Pagination';
import { FaPhoneAlt, FaTransgender, FaDirections, FaStethoscope, FaMedkit } from "react-icons/fa";
import { formatPhoneNumber } from '../../lib/helpers';
import Skeleton from 'react-loading-skeleton'
import Hero from "../../src/components/Doctors/Hero";
import Head from 'next/head'
import Image from 'next/image'
import { getAlldata } from '../../lib/api';


let PageSize = 5;


export default function AllPosts({ data }) {

  const siteSettings = data.siteSettings[0];
  const allDoctorsData = data.doctors;

  const [slicedData, setSlicedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);





  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setSlicedData(allDoctorsData.slice(firstPageIndex, lastPageIndex));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);


  if (!allDoctorsData || !slicedData) {
    return (
      <div><Skeleton count={1} className='dark:bg-moroi-dark' /></div>
    )
  }


  return (
    <>
      <Head>
        <meta charSet="utf-8" Lang='en' />
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
      <Hero />
      <div>

        <div>
          <div className="prose-slate grid grid-cols-1 mx-[5%] md:mx-[10%] mb-[15%] mt-[5%]">
            <div className="mt-12 max-w-2xl flex flex-col justify-start mb-[5%]">
              <h5 className="text-colorOne dark:text-colorRed">The Team</h5>
              <h1 className="text-3xl md:text-5xl uppercase font-bold text-start leading-9">Meet our team of experts</h1>
              <h3 className="text-slate-500">include highly qualified male and female practitioners</h3>

            </div>
            <div className="p-5 md:p-10 w-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-5">
              {slicedData &&
                slicedData.map((post, index) => (
                  <div key={index} className="max-w-xs bg-white dark:bg-moroi-dark rounded-xl shadow-md overflow-hidden my-5 border border-white dark:border dark:border-moroi-gray dark:shadow  grid grid-cols-1 grid-flow-row-dense">
                    <div className="">
                      <div className="relative">
                        <Image className="h-auto w-full object-cover rounded-tr rounded-tl md:rounded-tr-none m-0 mx-auto "
                          src={post.image == null ? 'https://cdn.sanity.io/images/25jlwdnp/production/e8c3aeeb6cf54f3b96b460647e91d1e8fd25414d-512x512.png' : post.image.asset.url} layout="responsive" width={250} height={250} alt={post.name && post.name} />
                      </div>
                      <div className="p-5 relative mb-10 w-full max-h-36">

                        <Link href={post.slug === undefined ? `/` : `/doctor/${post.slug.current}`} className="gap-2 mt-1 text-lg leading-tight font-medium text-inherit no-underline flex"><a><FaStethoscope className="self-center uppercase tracking-wide text-sm  font-semibold hover:underline text-iconcolor dark:text-white" />{post.name && post.name}</a></Link>

                        <div className="flex text-sm gap-2 mt-2 leading-4"><FaDirections className="self-center text-iconcolor dark:text-white" /> {post.Country && post.Country} </div>

                        <div className="flex text-sm gap-2 mt-2 leading-4"><FaTransgender className="self-center text-iconcolor dark:text-white" /> {post.Gender && post.Gender} </div>

                        <div className="flex text-sm gap-2 mt-2 leading-4"><FaPhoneAlt className="self-center text-iconcolor dark:text-white" /> {post.phoneNumber && formatPhoneNumber(post.phoneNumber)} </div>

                        <div className="px-5 text-sm uppercase tracking-wide font-meduim absolute -bottom-10 left-0 right-0 bg-colorSix dark:bg-moroi-stack rounded-br rounded-bl p-2 flex gap-2 justify-center align-middle text-colorOne dark:text-colorEight prose"><FaMedkit className="text-xl" />{post.Speicialties && post.Speicialties}</div>

                      </div>
                    </div>

                  </div>
                ))}
            </div>


          </div>
        </div>
        <div className="mx-[5%]">
          <Pagination
            key={crypto.randomUUID()}
            data-link={crypto.randomUUID()}
            className=""
            currentPage={currentPage}
            totalCount={allDoctorsData.length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
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