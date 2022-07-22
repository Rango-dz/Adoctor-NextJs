import Header from "./Header/header";
import Footer from "./Footer/footer";
import React, { useState, useEffect } from 'react'
import ScrollToTop from './ScrollToTop';
import Skeleton from 'react-loading-skeleton'
import AOS from 'aos';
import "aos/dist/aos.css";
import sanityClient from "../../lib/client";
import { createContext, useContext } from 'react';

const AppContext = createContext();

export default function Layout({ children }) {

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);


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
      <div className="my-20 m-[10%] flex flex-col mx-auto">
        <div><Skeleton circle={true} className='dark:bg-moroi-dark' /></div>
        <div><Skeleton count={3} className='dark:bg-moroi-dark' /></div>
      </div>

    )
  }

  return (
    <AppContext.Provider value={[siteSettings, theme, setTheme, doctorSettings]}>
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
