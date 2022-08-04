import React from 'react'
import Link from 'next/link';
import EmergencyNumber from './emergencyNumber'
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Footer(props) {
  const router = useRouter();
  // fetching site seettings
  const footer = props.footerSettings;
  console.log(footer)

  return (
    <>
      <footer className='ct-footer h-auto relative'>
        <EmergencyNumber props={props.footerSettings} />

        <div data-row="middle" className=" grid justify-items-start md:justify-items-center h-auto my-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-[5%] md:mx-[10%] pt-[35%] md:pt-[5%]">

          <div className='m-2 p-1'>
            <Link href="/">
              <a className="flex justify-center  flex-col">
                <Image src={footer.logoimage.asset.url} layout="fixed" width={200} height={29} alt={footer.title} className="text-center mx-auto" priority='true' />
                <span className="my-5 text-slate-500 self-center">{footer.subtitle}</span>
              </a>
            </Link></div>
          <div className='m-2 p-1'>
            <ul className='flex flex-col'>
              {
                footer.footerMenuOne.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link href={item.Url} key={index}><a className={router.pathname.split('/')[1] == item.Url.split('/')[3] ? "flex self-center uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-moroi-pinkdanger text-colorTwo dark:text-colorRed transition duration-300 font-semibold leading-5 space-x-1 text-sm" : "flex self-center uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-colorRed  transition duration-300 font-semibold leading-5 space-x-1 text-sm"}>{item.name}</a>
                      </Link>
                    </li>
                  )
                }
                )
              }
            </ul>
          </div>

          <div className='m-2 p-1'>
            <ul className='flex flex-col'>
              {
                footer.footerMenuTwo.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link href={item.Url} key={index}><a className={router.pathname.split('/')[1] == item.Url.split('/')[3] ? "flex self-center uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-moroi-pinkdanger text-colorTwo dark:text-colorRed transition duration-300 font-semibold leading-5 space-x-1 text-sm" : "flex self-center uppercase px-2 py-2 hover:text-colorTwo dark:hover:text-colorRed  transition duration-300 font-semibold leading-5 space-x-1 text-sm"}>{item.name}</a>
                      </Link>
                    </li>
                  )
                }
                )
              }
            </ul>
          </div>
        </div>
        <div data-row="bottom" className="text-center flex justify-center align-middle dark:shadow font-light text-sm">
          <div className='py-6'>{footer.footer} {footer.title}</div>
        </div>

      </footer>
    </>
  )
}
