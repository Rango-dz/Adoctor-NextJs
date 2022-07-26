import Header from "./Header/header";
import Footer from "./Footer/footer";
import React, { useState, useEffect } from 'react'
import ScrollToTop from './ScrollToTop';
import sanityClient from "../../lib/client";
import { createContext, useContext } from 'react';
import { useLocalStorage } from "../useLocalStorage";

const AppContext = createContext();

export default function Layout({ children }) {

  const [theme, setTheme] = useLocalStorage("theme", "light");


  // fetching site seettings
  const [siteSettings, setSiteSettings] = useState();
  const [doctorSettings, setDoctorSiteSettings] = useState();

  const mainSettings = async () => {
    const response = sanityClient.fetch(
      ` {
        "doctorSettings": * [_type == "TheDoctor"]{
    "image":mainImage{ asset -> { url } },
...
  },
  "siteSettings":*[_type == "siteSettings"]{
  "logoimage":logo{asset->{url}},
  "logoDarkimage":logoDark{asset->{url}},
  "socialimage":image{asset->{url}},
...
}
      }`
    );
    const data = await response;

    setSiteSettings(data.siteSettings[0]);
    setDoctorSiteSettings(data.doctorSettings[0]);
  }

  useEffect(() => {
    mainSettings();
  }, []);



  if (!siteSettings || !doctorSettings) {
    return (
      null

    )
  }

  return (
    <AppContext.Provider value={[siteSettings, theme, setTheme, doctorSettings]}>
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
      <Header />
      <main>{children}</main>
      <ScrollToTop />
      <Footer />
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}
