import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import HeaderTop from '../src/components/Header/headerTop';
import HeaderMiddle from '../src/components/Header/headerMiddle';
import { siteSettings } from '../lib/api';
import { useUser } from '@auth0/nextjs-auth0';
import retour from 'next/router';

const Footer = dynamic(() => import('../src/components/Footer/footer'), {})
const ScrollToTop = dynamic(() => import('../src/components/ScrollToTop'), {})

function dashboard({ settings }) {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!user) return (retour.push('/api/auth/login'));
  // fetching site seettings
  const siteSettings = settings[0];

  return (
    <>
      <Head>

        <title>{`${siteSettings.title} `}</title>

      </Head>
      <div id="main" className="dark:bg-moroi-back main-container" >
        <header id="header" className="ct-header">
          <HeaderTop headertop={siteSettings} />
          <HeaderMiddle headermiddle={siteSettings} />
        </header>


        <div className=''>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <div>
          <button onClick={() => retour.push('/api/auth/logout')}>Logout</button>
        </div>


        <ScrollToTop />
        <Footer footerSettings={siteSettings} />
      </div>
    </>
  )
}

export default dashboard


export async function getStaticProps() {
  const settings = await siteSettings();
  return {
    props: {
      settings
    },

  }
}