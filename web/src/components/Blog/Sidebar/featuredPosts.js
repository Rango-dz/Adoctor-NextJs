import React, { useEffect, useState } from "react";
import sanityClient from "../../../client";
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Image from 'next/image'

export default function FeaturedPosts() {

  const [allpostsData, setallposts] = useState();

  const allposts = async () => {
    const response = sanityClient.fetch(
      `
      *[_type == "post" && Featured == true]{
   title,
  slug,
  mainImage{asset->{url}},
  publishedAt,
      }
      
      `
    );
    const data = await response;
    setallposts(data);
  }

  useEffect(() => {
    allposts();
  }, []);


  if (!allpostsData) {
    return <Skeleton count={5} />
  }

  return (
    <>
      <h3 className="prose font-semibold dark:text-colorFive">Featured Articles</h3>
      <div className="w-full my-5">

        {allpostsData &&
          allpostsData.map((post, index) => (
            <div key={index} className="w-full rounded ">

              <div key={index} className="bg-white dark:bg-moroi-dark grid grid-cols-4 mx-auto justify-start align-middle  max-w-sm px-2 py-5 rounded shadow hover:bg-colorSix dark:hover:bg-moroi-gray hover:shadow-md m-1 ">

                <div className="relative flex flex-col justify-center mr-1"><Image src={post.mainImage.asset.url} layout="responsive" width={45} height={45} objectFit='true' alt={post.title} className="w-12 object-cover h-full rounded-full relative" /></div>
                <div className="col-span-3 flex flex-col gap-2 uppercase text-sm overflow-hidden text-clip w-full self-center truncate font-semibold">
                  <Link

                    key={index}
                    href={`/article/${post.slug.current}`}><a>{post.title}</a></Link>
                  <span className="text-sm text-slate-400">{new Date(post.publishedAt).toDateString()}</span>
                </div>

              </div>

            </div>
          )

          )}
      </div>
    </>
  )
}
