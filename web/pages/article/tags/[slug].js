import React, { useEffect, useState } from "react";
import sanityClient from "../../../lib/client";
import Pagination from '../../../src/components/Pagination/Pagination';
import Skeleton from 'react-loading-skeleton'
import { unslugify } from "../../../lib/helpers";
import Head from 'next/head'
import { siteSettings } from "../../../lib/api";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import BlogCard from "../../../src/components/Blog/BlogCard";

const HeroBlog = dynamic(() => import('../../../src/components/Blog/HeroBlog'), {});
const Categories = dynamic(() => import('../../../src/components/Blog/Sidebar/categories'), {});
const FeaturedPosts = dynamic(() => import('../../../src/components/Blog/Sidebar/featuredPosts'), {});
const Footer = dynamic(() => import('../../../src/components/Footer/footer'), {})
const ScrollToTop = dynamic(() => import('../../../src/components/ScrollToTop'), {})
const HeaderTop = dynamic(() => import('../../../src/components/Header/headerTop'), {});
const HeaderMiddle = dynamic(() => import('../../../src/components/Header/headerMiddle'), {})


let PageSize = 6;

export default function Tags({ post, settings }) {


  const router = useRouter()
  const { slug } = router.query

  const siteSettings = settings[0];

  const allPostsData = post;

  const [slicedData, setSlicedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);



  const allposts = async () => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setSlicedData(allPostsData.slice(firstPageIndex, lastPageIndex));
  }

  useEffect(() => {
    allposts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, allPostsData]);


  if (!allPostsData) {
    return (
      <div><Skeleton count={1} className='dark:bg-moroi-dark' /></div>
    )
  }

  return (
    <>
      <Head>
        <title>{`${siteSettings.title} ${unslugify(slug)}`}</title>
      </Head>
      <header id="header" className="ct-header">
        <HeaderTop headertop={siteSettings} />
        <HeaderMiddle headermiddle={siteSettings} />
      </header>
      <HeroBlog />
      <h1 className="mx-[5%] md:mx-[10%] mt-[5%] text-2xl md:text-4xl font-bold capitalize flex gap-1">#{unslugify(slug)}</h1>

      <div className="my-[5%] mx-[0%] md:mx-[10%] grid grid-cols-1 md:grid-cols-5 gap-5">
        <BlogCard slicedData={slicedData} />
        <div className="p-5">
          <Categories />
          <FeaturedPosts />
        </div>
      </div>
      <div className="mx-[5%]">
        <Pagination
          currentPage={currentPage}
          totalCount={allPostsData.length}
          pageSize={6}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
      <ScrollToTop />
      <Footer footerSettings={siteSettings} />
    </>
  );
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "post" && defined(Tags) ][].Tags[].value`
  )
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}
export async function getStaticProps(context) {
  const { slug = "" } = context.params
  const post = await sanityClient.fetch(`
    *[_type == "post" && Tags[].value match $slug  ] {
        title,
        slug,
        mainImage{
          asset->{
          _id,
          url
        }
      },
      "categories": categories[]->{
      title,
      slug,
       },
       publishedAt,
       "tag":Tags[]{value},
      body[0],
      "numberOfCharacters": length(pt::text(body)),
      "estimatedWordCount": round(length(pt::text(body)) / 5),
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  }
  `, { slug });
  const settings = await siteSettings();
  return {
    props: {
      post,
      settings
    }
  }
}