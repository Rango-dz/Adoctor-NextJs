import React, { useState } from 'react'
import Link from 'next/link';
import { FaHome, FaFileSignature, FaEnvelopeOpen, FaAlignJustify, FaMedkit } from 'react-icons/fa'
import UseDarkMode from '../DarkMode/useDarkSide';
import { useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';
// import { useLocalStorage } from '../../useLocalStorage';

export default function HeaderMiddle(props) {
  const router = useRouter();
  // fetching site seettings


  const logo = props.headermiddle;

  const [darkLogo, setDarkLogo] = useState(logo.logoimage.asset.url);

  const modeState = (useDarkMode) => {

    if (useDarkMode === 'dark' || useDarkMode === undefined) {
      setDarkLogo(logo.logoimage.asset.url);
    } else {
      setDarkLogo(logo.logoDarkimage.asset.url);
    }
  }

  useEffect(() => {
    modeState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const mobileMenu = () => {
    const menu = document.querySelector(".mobile-menu");
    menu.classList.toggle("hidden");
  }



  return (
    <>
      <div data-row="middle" className="py-6">
        {/* <!-- Navbar goes here --> */}
        <nav>
          <div className="w-full px-6">
            <div className="w-full flex justify-around">
              <div className="md:w-full md:flex md:justify-around">
                <div>
                  <Link href="#" className="flex items-start py-2 px-2 relative"><a>
                    <Image src={darkLogo} layout="fixed" width={200} height={29} priority='true' alt={logo.title} className="w-auto mr-2 h-5 md:h-7 lg:h-8 align-middle self-start" /></a>
                  </Link>
                </div>

                {/* <!-- Primary Navbar items --> */}
                <div className="hidden md:flex items-end align-middle justify-center">
                  <Link href="/" ><a className={router.pathname == "/" ? "flex self-center uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-moroi-pinkdanger text-colorTwo dark:text-colorRed transition duration-300 font-semibold leading-5 space-x-1 text-sm" : "flex self-center uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-colorRed  transition duration-300 font-semibold leading-5 space-x-1 text-sm"}><FaHome className=' text-iconcolor dark:text-colorEight hover:text-iconcolorhover m-[0.2rem] w-4 focus:text-colorTwo' />Home</a>
                  </Link>


                  <Link href="/about" >
                    <a className={router.pathname == "/doctor" ? "flex self-center uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-moroi-pinkdanger text-colorTwo dark:text-colorRed transition duration-300 font-semibold leading-5 space-x-1 text-sm" : "flex self-center uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-colorRed transition duration-300 font-semibold leading-5 space-x-1 text-sm"}><FaMedkit className=' text-iconcolor dark:text-colorEight hover:text-iconcolorhover m-[0.2rem] w-4' />About us</a>
                  </Link>

                  <Link href="/article" >
                    <a className={router.pathname == "/article" ? "flex self-center uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-moroi-pinkdanger text-colorTwo dark:text-colorRed transition duration-300 font-semibold leading-5 space-x-1 text-sm" : "flex self-center uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-colorRed transition duration-300 font-semibold leading-5 space-x-1 text-sm"}><FaFileSignature className=' text-iconcolor dark:text-colorEight hover:text-iconcolorhover m-[0.2rem] w-4' />Articles</a>
                  </Link>

                  <Link href="/contact" >
                    <a className={router.pathname == "/contact" ? "flex self-center uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-moroi-pinkdanger text-colorTwo dark:text-colorRed transition duration-300 font-semibold leading-5 space-x-1 text-sm" : "flex self-center uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-colorRed transition duration-300 font-semibold leading-5 space-x-1 text-sm"}><FaEnvelopeOpen className=' text-iconcolor dark:text-colorEight hover:text-iconcolorhover m-[0.2rem] w-4' />Contact Us</a>
                  </Link>

                  <UseDarkMode modeState={modeState} />


                </div>
              </div>

              {/* <!-- Mobile menu button --> */}
              <div className="md:hidden flex justify-between">
                <button onClick={() => mobileMenu()} className=" mobile-menu-button">
                  <div className="space-y-1">
                    <FaAlignJustify className='hover:text-iconcolor text-iconcolorhover dark:text-colorRed w-6 h-auto' />
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* mobile menu */}
          <div className="hidden mobile-menu md:hidden p-5">
            <div className="flex flex-col">
              <Link href="/" >
                <a className={router.pathname == "/" ? "flex self-start uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-moroi-pinkdanger text-colorTwo dark:text-colorRed transition duration-300 font-semibold leading-5 space-x-1 text-sm bg-colorSix w-full hover:bg-colorSix dark:bg-moroi-dark dark:hover:bg-moroi-dark rounded" : "hover:bg-colorSix dark:hover:bg-moroi-dark w-full flex self-start uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-moroi-pinkdanger transition duration-300 font-semibold leading-5 space-x-1 text-sm rounded"}><FaHome className={router.pathname == "/contact" ? "text-iconcolorhover dark:text-colorRed m-[0.2rem] w-4 focus:text-colorTwo dark:focus:text-colorRed" : "text-iconcolor dark:text-colorEight hover:text-iconcolorhover dark:hover:text-colorEight m-[0.2rem] w-4 focus:text-colorTwo"} />Home</a>
              </Link>

              <Link href="/about" >

                <a className={router.pathname == "/doctor" ? "flex self-start uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-moroi-pinkdanger text-colorTwo dark:text-colorRed transition duration-300 font-semibold leading-5 space-x-1 text-sm bg-colorSix w-full hover:bg-colorSix dark:bg-moroi-dark dark:hover:bg-moroi-dark rounded" : "hover:bg-colorSix dark:hover:bg-moroi-dark w-full flex self-start uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-moroi-pinkdanger transition duration-300 font-semibold leading-5 space-x-1 text-sm rounded"}><FaMedkit className={router.pathname == "/contact" ? "text-iconcolorhover dark:text-colorRed m-[0.2rem] w-4 focus:text-colorTwo dark:focus:text-colorRed" : "text-iconcolor dark:text-colorEight hover:text-iconcolorhover dark:hover:text-colorEight m-[0.2rem] w-4 focus:text-colorTwo"} />About us</a>
              </Link>

              <Link href="/article" >
                <a className={router.pathname == "/article" ? "flex self-start uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-moroi-pinkdanger text-colorTwo dark:text-colorRed transition duration-300 font-semibold leading-5 space-x-1 text-sm bg-colorSix w-full hover:bg-colorSix dark:bg-moroi-dark dark:hover:bg-moroi-dark rounded" : "hover:bg-colorSix dark:hover:bg-moroi-dark w-full flex self-start uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-moroi-pinkdanger transition duration-300 font-semibold leading-5 space-x-1 text-sm rounded"}><FaFileSignature className={router.pathname == "/contact" ? "text-iconcolorhover dark:text-colorRed m-[0.2rem] w-4 focus:text-colorTwo dark:focus:text-colorRed" : "text-iconcolor dark:text-colorEight hover:text-iconcolorhover dark:hover:text-colorEight m-[0.2rem] w-4 focus:text-colorTwo"} />Articles</a>
              </Link>

              <Link href="/contact" >
                <a className={router.pathname == "/contact" ? "flex self-start uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-moroi-pinkdanger text-colorTwo dark:text-colorRed transition duration-300 font-semibold leading-5 space-x-1 text-sm bg-colorSix w-full hover:bg-colorSix dark:bg-moroi-dark dark:hover:bg-moroi-dark rounded" : "hover:bg-colorSix dark:hover:bg-moroi-dark w-full flex self-start uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-moroi-pinkdanger transition duration-300 font-semibold leading-5 space-x-1 text-sm rounded"}><FaEnvelopeOpen className={router.pathname == "/contact" ? "text-iconcolorhover dark:text-colorRed m-[0.2rem] w-4 focus:text-colorTwo dark:focus:text-colorRed" : "text-iconcolor dark:text-colorEight hover:text-iconcolorhover dark:hover:text-colorEight m-[0.2rem] w-4 focus:text-colorTwo"} />Contact Us</a>
              </Link>

              <UseDarkMode modeState={modeState} />

            </div>
          </div>
        </nav>
      </div>
    </>
  )
}