import React, { useEffect, useState } from "react";
import sanityClient from "../../../lib/client";
import Pagination from '../../../src/components/Pagination/Pagination';
import Skeleton from 'react-loading-skeleton'
import { unslugify } from "unslugify";
import Head from 'next/head'
import { siteSettings } from "../../../lib/api";
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
import BlogCard from "../../../src/components/Blog/BlogCard";

const HeroBlog = dynamic(() => import('../../../src/components/Blog/HeroBlog'), {});
const Categories = dynamic(() => import('../../../src/components/Blog/Sidebar/categories'), {});
const Tags = dynamic(() => import('../../../src/components/Blog/Sidebar/Tags'), {});
const FeaturedPosts = dynamic(() => import('../../../src/components/Blog/Sidebar/featuredPosts'), {});
const Footer = dynamic(() => import('../../../src/components/Footer/footer'), {})
const ScrollToTop = dynamic(() => import('../../../src/components/ScrollToTop'), {})
const HeaderTop = dynamic(() => import('../../../src/components/Header/headerTop'), {});
const HeaderMiddle = dynamic(() => import('../../../src/components/Header/headerMiddle'), {})


let PageSize = 6;

export default function Category({ category, settings }) {

  const router = useRouter()
  const { slug } = router.query
  const keyword = unslugify(slug);

  const siteSettings = settings[0];

  const allPostsData = category;

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
        <title>{`${siteSettings.title} ${keyword}`}</title>
      </Head>
      <header id="header" className="ct-header">
        <HeaderTop headertop={siteSettings} />
        <HeaderMiddle headermiddle={siteSettings} />
      </header>
      <HeroBlog />

      <h1 className="mx-[5%] md:mx-[10%] mt-[5%] text-5xl font-bold capitalize flex gap-1">{keyword}</h1>

      <div className="my-[5%] mx-[0%] md:mx-[10%] grid grid-cols-1 md:grid-cols-5 gap-5">
        <BlogCard slicedData={slicedData} />

        {/* !!sidebar */}
        <div className="p-5">
          <Categories />
          <FeaturedPosts />
          <Tags allPostsData={allPostsData} />
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

export async function getServerSideProps(context) {
  const { slug = "" } = context.params
  const category = await sanityClient.fetch(`
    *[_type == "post" &&  categories[]->slug.current match $slug ] {
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
      category,
      settings
    }
  }
}