import React, { useEffect, useState } from "react";
import sanityClient from "../../../../lib/client";
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { FaBookMedical } from "react-icons/fa";


export default function Categories() {

  const [allcategoriesData, setallcategories] = useState();

  const allcategories = async () => {
    const response = sanityClient.fetch(
      `
      *[_type == "category"]{
        title,
        slug,
      }
      
      `
    );
    const data = await response;
    setallcategories(data);
  }

  useEffect(() => {
    allcategories();
  }, []);


  if (!allcategoriesData) {
    return <Skeleton count={5} />
  }

  return (
    <>
      <h2 className="prose font-semibold dark:text-colorFive">Categories</h2>
      <div className="w-full my-5">

        {allcategoriesData &&
          allcategoriesData.map((post, index) => (
            <div key={index} className="w-full bg-white dark:bg-moroi-dark flex mx-auto justify-start gap-2 align-middle max-w-sm p-4 rounded shadow hover:bg-colorSix dark:hover:bg-moroi-gray hover:shadow-md my-1 text-sm font-semibold uppercase ">

              <Link
                className=" "
                key={index}
                href={`/article/category/${post.slug.current}`} as={`/article/category/${post.slug.current}`}><a className="flex"><FaBookMedical className="self-center text-iconcolor dark:text-colorFive mr-2" />{post.title}</a></Link>

            </div>
          )

          )}
      </div>
    </>
  )
}
