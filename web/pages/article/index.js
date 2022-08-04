import React, { useEffect, useState } from "react";
import Head from 'next/head'
import Pagination from '../../src/components/Pagination/Pagination';
import dynamic from "next/dynamic";
import { siteSettings, articles } from "../../lib/api";
import { useRouter } from 'next/router';
import BlogCard from "../../src/components/Blog/BlogCard";


const HeaderTop = dynamic(() => import('../../src/components/Header/headerTop'), {});
const HeaderMiddle = dynamic(() => import('../../src/components/Header/headerMiddle'), {})
const HeroBlog = dynamic(() => import('../../src/components/Blog/HeroBlog'), {});
const Categories = dynamic(() => import('../../src/components/Blog/Sidebar/categories'), {});
const FeaturedPosts = dynamic(() => import('../../src/components/Blog/Sidebar/featuredPosts'), {});
const Tags = dynamic(() => import('../../src/components/Blog/Sidebar/Tags'), {});
const Footer = dynamic(() => import('../../src/components/Footer/footer'), {})
const ScrollToTop = dynamic(() => import('../../src/components/ScrollToTop'), {})

let PageSize = 6;


export default function Articles({ data, settings }) {

  const router = useRouter()
  const slug = router.pathname.split('/')[1]
  // site settings for seo
  const siteSettings = settings[0];

  // all posts
  const allPostsData = data;


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
      null
    )
  }

  return (
    <>
      <Head>
        <title>{`${slug} ${siteSettings.title} `}</title>
      </Head>
      <header id="header" className="ct-header">
        <HeaderTop headertop={siteSettings} />
        <HeaderMiddle headermiddle={siteSettings} />
      </header>
      <HeroBlog />
      <div className="my-[5%] mx-[0%] md:mx-[10%] grid grid-cols-1 md:grid-cols-5 gap-5">
        <BlogCard slicedData={slicedData} />

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

export async function getStaticProps() {
  const data = await articles();
  const settings = await siteSettings();
  return {
    props: {
      data,
      settings
    },
  }
}