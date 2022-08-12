import React from "react";
import Link from 'next/link';
import sanityClient from "../../lib/client";
import { PortableText } from '@portabletext/react';
import Skeleton from 'react-loading-skeleton';
import { slugify } from '../../lib/helpers';
import TableOfContents, { parseOutline } from '../../src/components/Blog/Sidebar/TableOfContent';
import { GiAlarmClock, GiCheckboxTree, GiCheckMark, GiOpenBook, GiPencil } from "react-icons/gi";
import Head from 'next/head';
import { siteSettings } from "../../lib/api";
import Image from 'next/image'
import dynamic from "next/dynamic";
import Script from "next/script";
import Comments from "../../src/components/Blog/comments";
import Form from '../../src/components/Blog/form'

const HeroBlog = dynamic(() => import('../../src/components/Blog/HeroBlog'), {});
const Categories = dynamic(() => import('../../src/components/Blog/Sidebar/categories'), {});
const FeaturedPosts = dynamic(() => import('../../src/components/Blog/Sidebar/featuredPosts'), {});
const Footer = dynamic(() => import('../../src/components/Footer/footer'), {})
const ScrollToTop = dynamic(() => import('../../src/components/ScrollToTop'), {})
const HeaderTop = dynamic(() => import('../../src/components/Header/headerTop'), {});
const HeaderMiddle = dynamic(() => import('../../src/components/Header/headerMiddle'), {})


export default function OnePost({ post, Settings }) {

  // site settings for seo
  const postData = post
  const siteSettings = Settings[0]


  if (!postData) return (
    <div><Skeleton count={1} className='dark:bg-moroi-dark' /></div>
  )

  const outline = parseOutline(postData.body)


  return (
    <>
      <Head>
        <Script type="application/ld+json"
          dangerouslySetInnerHTML={`
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
        />
        <title>{postData.name}</title>
      </Head>
      <header id="header" className="ct-header">
        <HeaderTop headertop={siteSettings} />
        <HeaderMiddle headermiddle={siteSettings} />
      </header>
      <HeroBlog />
      <div className="my-[5%] mx-[5%] md:mx-[10%] grid grid-cols-1 md:grid-cols-5 gap-5">
        <div className="w-full grid grid-cols-1 gap-10 col-span-4 justify-center overflow-hidden p-0 md:p-5 lg:p-10 bg-white dark:bg-moroi-dark shadow-md rounded ">

          <div className="relative rouned">


            <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-10 px-5 md:px-10 cursor-pointer capitalize text-center">{postData.title}</h1>
            <div className="flex gap-5 prose-lg  px-5 md:px-10 justify-center">
              <span >
                <Link href={`/doctor/${postData.authorslug.current}`} as={`/doctor/${postData.authorslug.current}`}><a className="flex justify-center align-middle gap-1"><GiPencil className="slef-center" /> Writer: {postData.name}</a></Link>
              </span>
              <span className="flex justify-center align-middle gap-1"> <GiAlarmClock className="slef-center" /> {new Date(postData.publishedAt).toDateString()}</span>
              <Link href={`/article/category/${slugify(postData.categories.title)}`} as={`/article/category/${slugify(postData.categories.title)}`}><a><span className="flex justify-center align-middle gap-1"><GiCheckMark className="slef-center" />Published in {postData.categories.title}</span></a></Link>
              <span className="flex justify-center align-middle gap-1"> <GiOpenBook className="slef-center" />{postData.estimatedReadingTime} Min Read</span>
            </div>

            <div className="rounded my-32 object-cover relative "><Image src={postData.mainImage.asset.url} alt="" layout="responsive" width={800} height={400} className="rounded" priority="true" placeholder="blur" blurDataURL={<Skeleton />} /></div>

          </div>

          <div className="prose-xl prose-headings:bold  prose-li:list-disc px-5 md:px-10">
            <PortableText
              value={postData.body}
              projectId={sanityClient.projectId}
              dataset={sanityClient.dataset}
              components={{
                block: {
                  // Customize block types with ease
                  h1: ({ children }) => <h1 id={slugify(children)} className="text-5xl font-bold"><a href={`#${slugify(children)}`}>{children}</a></h1>,
                  h2: ({ children }) => <h2 id={slugify(children)} className="text-4xl font-bold"><a href={`#${slugify(children)}`}>{children}</a></h2>,
                  h3: ({ children }) => <h3 id={slugify(children)} className="text-3xl font-bold"><a href={`#${slugify(children)}`}>{children}</a></h3>,
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
                  href={`/article/tags/${tag.value}`} as={`/article/tags/${tag.value}`}><a className="flex p-2 text-base dark:hover:bg-moroi-stack dark:bg-moroi-gray cursor-pointer gap-1 rounded-lg bg-colorSix w-fit">#{tag.value}</a>
                </Link>

              ))
              }
            </div>

          </div>



        </div>

        {/* sidebar */}
        <div className="p-5">
          <h3 className="prose font-semibold dark:text-colorFive">Table of content</h3>
          <div className='prose-sm prose-li:font-semibold prose-li:list-decimal p-2 my-5'>

            <TableOfContents outline={outline || <Skeleton count={5} />} />
          </div>
          <Categories />
          <FeaturedPosts />
        </div>

        {/* comments */}
        <div className=" w-full grid grid-cols-1 gap-10 col-span-4 justify-center overflow-hidden p-5 lg:p-10 bg-white dark:bg-moroi-dark shadow-md rounded ">
          <Form _id={post._id} />
          <Comments comment={post.comments} />
        </div>

      </div>
      <ScrollToTop />
      <Footer footerSettings={siteSettings} />
    </>
  );
}



export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  )
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}
export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = context.params
  const Settings = await siteSettings()
  const post = await sanityClient.fetch(`
    *[_type == "post" && slug.current == $slug] | order(_updatedAt desc){
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
    'comments': *[_type == "comment" && post._ref == ^._id && approved == true]{
            _id, 
            name, 
            email, 
            comment, 
            _createdAt
        },
  }[0]
  `, { slug })
  return {
    props: {
      post,
      Settings,
    }
  }
}