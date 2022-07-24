import React, { useEffect, useState } from "react";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Pagination from '../../src/components/Pagination/Pagination';
import { PortableText } from '@portabletext/react'
import Skeleton from 'react-loading-skeleton'
import { slugify } from '../../lib/helpers';
import { getAlldata } from '../../lib/api';
import sanityClient from "../../lib/client";
import dynamic from "next/dynamic";

const HeroBlog = dynamic(() => import('../../src/components/Blog/HeroBlog'), { ssr: false });
const Categories = dynamic(() => import('../../src/components/Blog/Sidebar/categories'), { ssr: false });
const FeaturedPosts = dynamic(() => import('../../src/components/Blog/Sidebar/featuredPosts'), { ssr: false });
const Tags = dynamic(() => import('../../src/components/Blog/Sidebar/Tags'), { ssr: false });

let PageSize = 6;


export default function AllPosts({ data }) {

  // site settings for seo
  const siteSettings = data.siteSettings[0];

  // all posts
  const allPostsData = data.allPostsData;

  // slice post for paggination
  const [slicedData, setSlicedData] = useState([]);
  // list of posts after slicing theme
  const [currentPage, setCurrentPage] = useState(1);



  useEffect(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setSlicedData(allPostsData.slice(firstPageIndex, lastPageIndex));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);


  if (!allPostsData) {
    return (
      <div><Skeleton count={3} className='dark:bg-moroi-dark' /></div>
    )
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" Lang='en' />
        <title>Articles - {siteSettings.title}</title>
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
      <HeroBlog />
      <div className="my-[5%] mx-[0%] md:mx-[10%] grid grid-cols-1 md:grid-cols-5 gap-5">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 col-span-4 justify-center overflow-hidden p-5">
          {slicedData &&
            slicedData.map((post, index) => (


              <div key={index} className="border border-white dark:border-moroi-dark bg-white dark:bg-moroi-dark shadow-md rounded gap-10 w-full overflow-hidden py-5 hover:shadow-lg h-fit">
                <div key={index} className="px-5">

                  {/* category and read time */}
                  <div key={index} className="flex text-sm font-semibold">
                    {post.categories && post.categories.map((cat, index) => {
                      return (
                        <ul key={index} className="p-0 m-0">
                          <li className="list-none">
                            <Link className="hover:underline mr-2 uppercase cursor-pointer" key={index} href={`/categories/${cat.slug.current}`}><a>{cat.title} / </a></Link>
                          </li>
                        </ul>
                      )
                    })}
                    <li key={index} className="list-none">
                      {post.estimatedReadingTime} Min
                    </li>
                  </div>


                  {/* title */}
                  <Link href={"/article/" + post.slug.current} key={post.slug.current} className="text-2xl font-bold ">
                    <h2 className="my-5 capitalize"><a>{post.title}</a></h2>
                  </Link>
                </div>

                {/* image */}
                <div className="mb-10 relative w-auto">
                  <div>
                    <Image src={post.mainImage.asset.url} alt="" layout="responsive" width={512} height={300} priority='true' className="aspect-video h-auto object object-cover w-full relative" />
                  </div>
                </div>

                {/* short description */}
                <div className="prose-colorThree px-5 my-10 leading-relaxed font-light">
                  <PortableText
                    value={post.body}
                    projectId={sanityClient.projectId}
                    dataset={sanityClient.dataset}
                    className="prose font-light"
                    components={{
                      block: {
                        // Customize block types with ease
                        h1: ({ children }) => <h1 id={slugify(children)} className="text-2xl"><a href={`#${slugify(children)}`}>{children}</a></h1>,
                        h2: ({ children }) => <h2 id={slugify(children)} className="text-2xl"><a href={`#${slugify(children)}`}>{children}</a></h2>,
                        h3: ({ children }) => <h3 id={slugify(children)} className="text-2xl"><a href={`#${slugify(children)}`}>{children}</a></h3>,
                      }
                    }}
                  />
                </div>

                {/* tags */}
                <div className="flex flex-auto gap-5 mx-5 mt-10 ">
                  {post.tag && post.tag.map((tag, index) => {
                    return (
                      <div key={index} className="bg-white dark:bg-moroi-stack  rounded text-sm text-slate-600 dark:text-colorFive font-semibold  p-1 hover:shadow hover:bg-colorSix hover:border-colorSix dark:hover:bg-moroi-gray dark:hover:border-moroi-gray">
                        <Link
                          key={index}
                          href={`/article/tags/${tag.value}`}><a>#{tag.value}</a>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>


            ))}
        </div>

        {/* !!sidebar */}
        <div className="p-5">
          <Categories />
          <FeaturedPosts />
          <Tags allPostsData={allPostsData} />
        </div>
      </div>

      {/* pagination */}
      <div className="mx-[5%]">
        <Pagination
          key={crypto.randomUUID()}
          data-link={crypto.randomUUID()}
          className=""
          currentPage={currentPage}
          totalCount={allPostsData.length}
          pageSize={6}
          onPageChange={page => setCurrentPage(page)}
        />
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