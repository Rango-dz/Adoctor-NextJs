import React, { useEffect, useState } from "react";
import Link from 'next/link'
import sanityClient from "../../src/client";
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from "@sanity/image-url";
import HeroBlog from "../../src/components/Blog/HeroBlog";
import Skeleton from 'react-loading-skeleton'
import Categories from "../../src/components/Blog/Sidebar/categories";
import FeaturedPosts from "../../src/components/Blog/Sidebar/featuredPosts.js";
import TableOfContents, { parseOutline } from '../../src/components/Blog/Sidebar/TableOfContent'
import { slugify } from '../../src/components/helpers/helpers'
import { GiAlarmClock, GiCheckboxTree, GiOpenBook, GiPriceTag } from "react-icons/gi";
import { useAppContext } from "../../src/components/Layout";
import Head from 'next/head'
import { useRouter } from 'next/router'
import Image from 'next/image'

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function OnePost() {
  // site settings for seo
  const context = useAppContext();
  const siteSettings = context[0];

  const [postData, setPostData] = useState(null);

  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == $slug]{
        title,
        _id,
        mainImage{
        asset->{
        url
        }
        },
        body,
        categories[0]->{
        title,
        slug
        },
        publishedAt,
        slug,
        "tag":Tags[]{
        value
        },
        "name": author->name,
        "authorslug": author->slug,
        "authorImage": author->{mainImage{
                       asset->{
                       url
                       }
                       }},
  "previousPost": *[_type == "post" && ^.publishedAt > publishedAt]|order(publishedAt desc)[0]{title,"slug": slug.current},
  "nextPost": *[_type == "post" && ^.publishedAt < publishedAt]|order(publishedAt asc)[0]{title,"slug": slug.current},
  "numberOfCharacters": length(pt::text(body)),
  "estimatedWordCount": round(length(pt::text(body)) / 5),
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
  }`,
        { slug }
      )
      .then((data) => {
        setPostData(data[0])
      })
      .catch(console.error);

  }, [slug]);

  if (!postData) return (
    <div className="my-20 mx-[5%]">
      <Skeleton count={10} />
    </div>
  )

  const outline = parseOutline(postData.body)


  return (
    <>
      <Head>
        <meta charSet="utf-8" Lang='en' />
        <script type="application/ld+json">{`
          {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": ${postData.title},
          "image": ${postData.mainImage.asset.url},  
          "author": {
            "@type": "Person",
            "name": ${postData.name},
          },  
          "publisher": {
            "@type": "Organization",
            "name": ${siteSettings.title},
            "logo": {
              "@type": "ImageObject",
              "url": ${siteSettings.logo.asset.url}
            }
          },
          "datePublished": ${postData.publishedAt},
        }
          `}
        </script>

        <title>{postData.name}</title>
        <meta name="title" content={postData.name} />

        <meta property="og:type" content="person" />
        <meta property="og:url" content={`${siteSettings.website}/article/${slug}`} />
        <meta property="og:title" content={postData.name} />

        <meta property="og:image" content={postData.mainImage.asset.url} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${siteSettings.website}/article/${slug}`} />
        <meta property="twitter:title" content={postData.name} />
        <meta property="twitter:image" content={postData.mainImage.asset.url} />
      </Head>
      <HeroBlog />
      <div className="my-[5%] mx-[5%] md:mx-[10%] grid grid-cols-1 md:grid-cols-5 gap-5">
        <div className="w-full grid grid-cols-1 gap-10 col-span-4 justify-center overflow-hidden p-0 md:p-5 lg:p-10 bg-white dark:bg-moroi-dark shadow-md rounded ">

          <div className="relative rouned">
            <div className="rounded mb-10 object-cover w-full relative"><Image src={urlFor(postData.mainImage.asset.url).width(800).url()} alt="" layout="responsive" width={800} height={500} className="" /></div>

            <h1 className="font-semibold text-3xl mb-8 px-5 md:px-10">{postData.title}</h1>
            <div className="flex gap-5 font-semibold text-sm px-5 md:px-10">
              <span className="flex justify-center align-middle gap-1"> <GiAlarmClock className="slef-center" /> {new Date(postData.publishedAt).toDateString()}</span>
              <Link href={`/article/category/${slugify(postData.categories.title)}`}><a><h3 className="flex justify-center align-middle gap-1"><GiCheckboxTree className="slef-center" />{postData.categories.title}</h3></a></Link>
              <span className="flex justify-center align-middle gap-1"> <GiOpenBook className="slef-center" />{postData.estimatedReadingTime} Min</span>
            </div>

          </div>

          <div className="prose-base prose-headings:prose-2xl prose-headings:font-semibold prose-headings:underline prose-li:list-disc px-5 md:px-10">
            <PortableText
              value={postData.body}
              projectId={sanityClient.projectId}
              dataset={sanityClient.dataset}
              components={{
                block: {
                  // Customize block types with ease
                  h1: ({ children }) => <h1 id={slugify(children)} className="text-3xl"><a href={`#${slugify(children)}`}>{children}</a></h1>,
                  h2: ({ children }) => <h2 id={slugify(children)} className="text-2xl"><a href={`#${slugify(children)}`}>{children}</a></h2>,
                  h3: ({ children }) => <h3 id={slugify(children)} className="text-xl"><a href={`#${slugify(children)}`}>{children}</a></h3>,
                },
                Text: {
                  // Customize text types with ease
                  strong: ({ children }) => <strong>{children}</strong>,
                  em: ({ children }) => <em>{children}</em>,
                  a: ({ children, href }) => <a href={href}>{children}</a>,
                  p: ({ children }) => <p className="w-full mx-auto">{children}</p>,
                  ul: ({ children }) => <ul>{children}</ul>,
                  li: ({ children }) => <li className="list-disc">{children}</li>,
                  ol: ({ children }) => <ol>{children}</ol>,
                  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
                  hr: () => <hr />,
                  table: ({ children }) => <table>{children}</table>,
                  thead: ({ children }) => <thead>{children}</thead>,
                  tbody: ({ children }) => <tbody>{children}</tbody>,
                  tr: ({ children }) => <tr>{children}</tr>,
                  th: ({ children }) => <th>{children}</th>,
                  td: ({ children }) => <td>{children}</td>,
                  code: ({ children }) => <code>{children}</code>,
                  pre: ({ children }) => <pre>{children}</pre>,
                  inlineCode: ({ children }) => <code>{children}</code>,
                }
              }}
            />
          </div>
          <div>
            <div className="flex flex-col md:flex-row gap-5 m-5">
              {postData.tag && postData.tag.map((tag, index) => (

                <Link
                  key={index}
                  className=""
                  href={`/article/tags/${tag.value}`}><a className="flex border p-2 font-semibold hover:bg-colorSix dark:bg-moroi-stack dark:hover:bg-moroi-gray dark:border-moroi-gray hover:shadow-md cursor-pointer gap-1 rounded-lg"><GiPriceTag className="self-center" />{tag.value}</a>
                </Link>

              ))
              }
            </div>
            <div className="flex flex-row mx-auto md:mx-0 gap-5 my-5 border rounded-full max-w-fit bg-colorSix dark:bg-moroi-dark dark:border-moroi-gray dark:shadow-[#232323] shadow-md dark:hover:bg-moroi-gray relative">
              <Image
                src={urlFor(postData.authorImage.mainImage.asset.url).width(100).url()}
                alt={postData.name}
                className="rounded-full mr-2 relative"
                width={100} height={100}
              />
              <h4 className="self-center items-center font-bold underline pr-5">
                <Link href={`/doctor/${postData.authorslug.current}`}><a>{postData.name}</a></Link>
              </h4>
            </div>
          </div>

        </div>

        {/* sidebar */}
        <div className="p-5">
          <h3 className="prose font-semibold dark:text-colorFive">Table of content</h3>
          <div className='prose-sm prose-li:font-semibold prose-li:list-decimal p-2 my-5'><TableOfContents outline={outline || <Skeleton count={5} />} /></div>
          <Categories />
          <FeaturedPosts />
        </div>
      </div>
    </>
  );
}