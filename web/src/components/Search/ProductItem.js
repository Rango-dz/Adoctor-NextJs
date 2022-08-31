import React from 'react';
import Image from 'next/image'

export function ProductItem({ hit, components }) {
  return (
    <a href={`/article/${hit.slug}`} className="aa-ItemLink capitalize font-semibold font-sans" >

      <div className="aa-ItemContent">
        <div className="aa-ItemContent-image relative">
          <Image src={hit.mainImage.asset.url} layout="intrinsic" width={48} height={48} alt="" className='w-12 h-12 rounded object-cover relative' />
        </div>
        <div className="aa-ItemTitle">
          <components.Highlight hit={hit} attribute="title" />
        </div>
      </div>

    </a>
  );
}
