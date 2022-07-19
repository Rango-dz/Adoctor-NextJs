import React, { useEffect, useState } from "react";
import Link from 'next/link'
import sanityClient from "../../../src/client.js";
import Pagination from '../../../src/components/Pagination/Pagination';
import { PortableText } from '@portabletext/react'
import HeroBlog from "../../../src/components/Blog/HeroBlog";
import Skeleton from 'react-loading-skeleton'
import Categories from "../../../src/components/Blog/Sidebar/categories";
import Tags from "../../../src/components/Blog/Sidebar/Tags";
import FeaturedPosts from "../../../src/components/Blog/Sidebar/featuredPosts.js";
import { unslugify } from "unslugify";
import { slugify } from '../../../src/components/helpers/helpers'
import Head from 'next/head'
import Image from 'next/image'
import { useAppContext } from "../../../src/components/Layout";
import { useRouter } from 'next/router'

let PageSize = 6;

export default function Category() {

  const router = useRouter()
  const { slug } = router.query
  const keyword = unslugify(slug);

  const context = useAppContext();
  const siteSettings = context[0];

  const [allPostsData, setAllPosts] = useState();
  const [slicedData, setSlicedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);



  const allposts = async () => {
    const response = sanityClient.fetch(
      `*[_type == "post" &&  $slug in categories[]->slug.current ] {
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
}`,
      { slug }
    );
    const data = await response;
    setAllPosts(data);
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    setSlicedData(data.slice(firstPageIndex, lastPageIndex));
  }

  useEffect(() => {
    allposts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, slug]);


  if (!allPostsData) {
    return (
      <div className="my-20 mx-[5%]">
        <Skeleton count={10} />
      </div>
    )
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" Lang='en' />
        <title>{`${siteSettings.title} ${keyword}`}</title>
        <meta name="title" content={`${siteSettings.title} ${keyword}`} />
        <meta name="description" content={siteSettings.description} />
        <meta name="keywords" content={siteSettings.keywords} />

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
                          <Link className=" no-underline mr-2" key={index} href={`/categories/${cat.slug.current}`}><a>{cat.title} / </a></Link>
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
                <Image src={post.mainImage.asset.url} alt="" layout="responsive" width={512} height={300} className="aspect-video h-auto object object-cover w-full relative" />
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
                        href={`/tags/${tag.value}`}><a>#{tag.value}</a>
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