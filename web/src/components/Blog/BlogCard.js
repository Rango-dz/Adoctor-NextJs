import React from 'react'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { slugify } from '../../../lib/helpers';
import Image from 'next/image'
import sanityClient from "../../../lib/client";

function BlogCard(prop) {

  const slicedData = prop.slicedData
  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 col-span-4 justify-center overflow-hidden p-5">
        {slicedData &&
          slicedData.map((post, index) => (


            <div key={index} className="border dark:border-moroi-stack bg-white dark:bg-moroi-dark shadow-md rounded gap-10 w-full overflow-hidden pt-5 hover:shadow-lg h-fit">
              <div key={index} className="px-5">

                {/* category and read time */}
                <div key={index} className="flex ">
                  {post.categories && post.categories.map((cat, index) => {
                    return (
                      <ul key={index} className="p-0 m-0">
                        <li className="list-none">
                          <Link className="cursor-pointer" key={index} href={`/categories/${cat.slug.current}`}>
                            <a className="p-2 rounded border mx-1 uppercase text-slate-500 dark:text-colorSix font-semibold text-base hover:bg-colorSix dark:hover:bg-moroi-gray dark:border-moroi-stack"> {cat.title} </a></Link>
                        </li>
                      </ul>
                    )
                  })}
                </div>



              </div>

              {/* image */}
              <div className="mt-5 relative w-auto">
                <div>
                  <Image src={post.mainImage.asset.url} alt="" layout="responsive" width={512} height={300} priority='true' className="aspect-video h-auto object object-cover w-full relative" />
                </div>
              </div>

              {/* title */}
              <div className='px-5'>
                <Link href={"/article/" + post.slug.current} key={post.slug.current} className="text-2xl font-bold ">
                  <h2 className="my-5 capitalize cursor-pointer font-bold text-3xl"><a>{post.title}</a></h2>
                </Link>
              </div>


              {/* short description */}
              <div className="prose-lg text-slate-400 dark:text-colorFive px-5 my-5 leading-relaxed font-light">
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
              <div className="border-t mt-10 dark:border-moroi-stack shadow"></div>
              <div className="flex flex-auto gap-5 mx-5 my-2 prose-lg">
                {post.tag && post.tag.map((tag, index) => {
                  return (
                    <div key={index} className="  rounded dark:text-colorFive  px-2 py-1 hover:bg-colorSix hover:border-colorSix dark:hover:bg-moroi-gray dark:hover:border-moroi-gray border dark:border-moroi-stack">
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
    </>
  )
}

export default BlogCard