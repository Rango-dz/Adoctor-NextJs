import React from 'react';
import HeaderTop from './headerTop';
import HeaderMiddle from './headerMiddle';
import { useAppContext } from "../Layout";

export default function Header() {

  const context = useAppContext();
  const siteSettings = context[0];

  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="dns-prefetch" href="cdn.sanity.io" />
      <meta name="title" content={siteSettings.title} />
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
      <header id="header" className="ct-header">
        <HeaderTop />
        <HeaderMiddle />

      </header>
    </>
  )
}
