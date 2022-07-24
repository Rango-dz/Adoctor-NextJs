import React, { useEffect, useState } from 'react';
import sanityClient from "../../../lib/client";
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import '@algolia/autocomplete-theme-classic'
import algoliasearch from 'algoliasearch';
import { Autocomplete } from '../Search/Autocomplete';
import { ProductItem } from '../Search/ProductItem';
import Skeleton from 'react-loading-skeleton';


export default function HeroBlog() {
  const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_ID, process.env.NEXT_PUBLIC_ALGOLIA_API_KEY);
  const index = searchClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX);

  const [postData, setPostData] = useState(null);
  const [datalength, setDatalength] = useState(0);


  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type in ["post"] 
        && !(_id in path('drafts.**')) ]{
title,
"objectID": _id,
mainImage{
          asset->{
          url
        }
        },
"categories": categories[]->{
    title,
    _id,
  },

"slug":slug.current,
"tag":Tags[]{value},
}`,
      )
      .then((data) => {

        setPostData(data)
        setDatalength(data.length)
        if (data.length !== datalength) {
          searchClient.listIndices().then(({ items }) => {
            if (items[0].entries !== data.length) {
              index.saveObjects(data, { autoGenerateObjectIDIfNotExist: true });
            }
          });
        }
      })
      .catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!postData) return (
    <div className='m-[5%] mx-auto w-1/4'>
      <Skeleton count={3} circle={true} />
    </div>

  );

  return (
    <>
      <div data-row-header="bottom" className=" grid justify-center py-[5%] px-[10%] grid-cols-1 align-middle bg-gradient-to-b from-colorSix to-colorSix dark:from-moroi-dark dark:to-moroi-dark w-full">

        <div className="app-container mx-auto md:w-1/3 w-4/5 text-colorOne hover:bg-slate-200 dark:hover:bg-moroi-dark dark:shadow-[#232323]">
          <Autocomplete
            openOnFocus={true}
            placeholder="Search for an article"
            getSources={({ query }) => [
              {
                sourceId: 'title',
                getItems() {
                  return getAlgoliaResults({
                    searchClient,
                    queries: [
                      {
                        indexName: 'blogdata',
                        query,
                      },
                    ],
                  });
                },
                getItemUrl({ item }) {
                  return item.url;
                },
                templates: {
                  item({ item, components }) {
                    return <ProductItem hit={item} components={components} className="hover:bg-slate-100 dark:hover:bg-moroi-dark" />;


                  },
                },
              },
            ]}
          />
        </div>

      </div>
    </>
  )
}