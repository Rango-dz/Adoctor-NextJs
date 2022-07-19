import React from "react";
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { slugify } from "../../helpers/helpers";

export default function Tags(props) {


  if (!props.allPostsData) {
    return <Skeleton count={5} />
  }

  return (
    <div>
      <h3 className="prose mt-5 font-semibold dark:text-colorFive">Tags</h3>
      <div className="block gap-1 justify-start mt-5">
        {props.allPostsData.map((post, index) => {
          return (
            post.tag && post.tag.map((tag, index) => {
              return (
                <div key={index} className="p-1 text-sm text-slate-600 dark:text-colorFive uppercase bg-colorSix dark:bg-moroi-dark dark:bg-opacity-25 hover:bg-colorFive dark:hover:bg-moroi-gray hover:rounded m-1">
                  <Link
                    key={index}
                    href={`/article/tags/${slugify(tag.value)}`}><a>#{tag.value}</a>
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
