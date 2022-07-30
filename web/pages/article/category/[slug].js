import React, { useEffect, useState } from "react";
import Link from 'next/link'
import sanityClient from "../../../lib/client";
import Pagination from '../../../src/components/Pagination/Pagination';
import { PortableText } from '@portabletext/react'
import Skeleton from 'react-loading-skeleton'
import { unslugify } from "unslugify";
import { slugify } from '../../../lib/helpers'
import Head from 'next/head'
import Image from 'next/image'
import { siteSettings } from "../../../lib/api";
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";

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
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 col-span-4 justify-center overflow-hidden p-5">
          {slicedData.map((post, index) => (


            <div key={index} className="border border-white dark:border-moroi-gray bg-white dark:bg-moroi-dark shadow-md rounded gap-10 w-full overflow-hidden py-5 hover:shadow-lg h-fit">
              <div className="px-5">

                {/* category and read time */}
                <div className="flex text-sm font-semibold">
                  {post.categories && post.categories.map((cat, index) => {
                    return (
                      <ul key={index} className="p-0 m-0">
                        <li className="list-none">
                          <Link className=" no-underline mr-2" key={index} href={`/categories/${cat.slug.current}`}><a> {cat.title} / </a></Link>
                        </li>
                      </ul>
                    )
                  })}
                  <li className="list-none">
                    {post.estimatedReadingTime} Min
                  </li>
                </div>


                {/* title */}
                <Link href={"/article/" + post.slug.current} key={post.slug.current} className="text-2xl font-bold">
                  <h2 className="my-5 capitalize"><a>{post.title}</a></h2>
                </Link>
              </div>

              {/* image */}
              <div className="mb-10 relative">
                <Image src={post.mainImage.asset.url} alt="" layout="responsive" width={512} height={300} className="aspect-video h-auto object object-cover w-full relative" priority='true' />
              </div>

              {/* short description */}
              <div className="prose-colorThree px-5 my-10 leading-relaxed font-light">
                <PortableText
                  value={post.body}
                  projectId={sanityClient.projectId}
                  dataset={sanityClient.dataset}
                  className="prose"
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
              <div className="flex flex-auto gap-5 mx-5 mt-10">
                {post.tag && post.tag.map((tag, index) => {
                  return (
                    <div key={index} className="bg-white dark:bg-moroi-stack  rounded text-sm text-slate-600 dark:text-colorFive font-semibold  p-1 hover:shadow hover:bg-colorSix hover:border-colorSix dark:hover:bg-moroi-gray dark:hover:border-moroi-gray">
                      <Link
                        key={index} className="bg-white dark:bg-moroi-stack p-1 rounded text-sm text-slate-600 dark:text-colorFive font-semibold hover:shadow hover:bg-colorSix hover:border-colorSix dark:hover:bg-moroi-gray dark:hover:border-moroi-gray"
                        href={`/article/tags/${tag.value}`}><a>#{tag.value}</a>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>


          ))
          }

        </div>

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


export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "post" && defined(categories) ][].categories[]->slug.current`
  )

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}

export async function getStaticProps(context) {
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
    },
  }
}