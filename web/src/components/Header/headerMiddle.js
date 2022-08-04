import React, { useState } from 'react'
import Link from 'next/link';
import { useEffect } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';
import { FaHome, FaAlignJustify } from 'react-icons/fa'
import UseDarkMode from '../DarkMode/useDarkSide';
// import { useLocalStorage } from '../../useLocalStorage';

export default function HeaderMiddle(props) {
  const router = useRouter();

  // fetching site seettings


  const logo = props.headermiddle;

  const [darkLogo, setDarkLogo] = useState(logo.logoimage.asset.url);

  const modeState = (theme) => {

    if (theme === 'dark' || theme === undefined || theme === null) {
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
                  {
                    logo.MainMenu.map((item, index) => {
                      return (
                        <Link href={item.Url} key={index}><a className={router.pathname.split('/')[1] == item.Url.split('/')[3] ? "flex self-center uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-moroi-pinkdanger text-colorTwo dark:text-colorRed transition duration-300 font-semibold leading-5 space-x-1 text-sm" : "flex self-center uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-colorRed  transition duration-300 font-semibold leading-5 space-x-1 text-sm"}>{item.name}</a>
                        </Link>

                      )
                    }
                    )
                  }

                  <UseDarkMode modeState={modeState} />


                </div>
              </div>

              {/* <!-- Mobile menu button --> */}
              <div className="md:hidden flex justify-between">
                <button onClick={() => mobileMenu()} className=" mobile-menu-button" name='Main Menu'>
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
              {
                logo.MainMenu.map((item, index) => {
                  return (
                    <Link href={item.Url} key={index}><a className={router.pathname.split('/')[1] == item.Url.split('/')[3] ? "flex self-center uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-moroi-pinkdanger text-colorTwo dark:text-colorRed transition duration-300 font-semibold leading-5 space-x-1 text-sm" : "flex self-center uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-colorRed  transition duration-300 font-semibold leading-5 space-x-1 text-sm"}>{item.name}</a>
                    </Link>

                  )
                }
                )
              }

              <UseDarkMode modeState={modeState} />

            </div>
          </div>
        </nav>
      </div>
    </>
  )
}