import React from "react";
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Tags(props) {


  if (!props.allPostsData) {
    return <Skeleton count={5} />
  }

  return (
    <div>
      <h2 className="prose mt-5 font-semibold dark:text-colorFive">Tags</h2>
      <div className="block gap-1 justify-start mt-5">
        {props.allPostsData.map((post, index) => {
          return (
            post.tag && post.tag.map((tag, index) => {
              return (
                <div key={index} className="p-1 text-sm text-slate-600 dark:text-colorFive uppercase bg-colorSix dark:bg-moroi-dark dark:bg-opacity-25 hover:bg-colorFive dark:hover:bg-moroi-gray hover:rounded m-1 w-fit">
                  <Link
                    key={index}
                    href={`/article/tags/${tag.value}`} as={`/article/tags/${tag.value}`}><a>#{tag.value}</a>
                  </Link>
                </div>
              )
            })
          )

        }
        ) || <Skeleton count={3} />}
      </div>
    </div>
  )
}
