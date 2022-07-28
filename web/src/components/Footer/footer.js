import React from 'react'
import Link from 'next/link';
import EmergencyNumber from './emergencyNumber'
import Image from 'next/image'

export default function Footer(props) {

  // fetching site seettings
  const footer = props.footerSettings;

  return (
    <>
      <footer className='ct-footer h-auto relative'>
        <EmergencyNumber props={props.doctorSettings} />

        <div data-row="middle" className=" grid justify-items-start md:justify-items-center h-auto my-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-[5%] md:mx-[10%] pt-[35%] md:pt-[5%]">

          <div className='m-2 p-1'><Link href="#" className="flex justify-start py-2 px-2 flex-col relative"><a>
            <Image src={footer.logoimage.asset.url} layout="responsive" width={480} height={70} alt={footer.title} className="w-1/2 mr-2 h-10 align-middle self-center relative" priority='true' />
            <span className="my-5 font-bold text-slate-500 self-center">{footer.subtitle}</span></a>
          </Link></div>
          <div className='m-2 p-1'>
            <ul className='flex flex-col'>
              <Link href="/"><a>About us</a></Link>
              <Link href="/"><a>Term of service</a></Link>
              <Link href="/"><a>Privacy</a></Link>
            </ul>
          </div>

          <div className='m-2 p-1'>
            <ul className='flex flex-col'>
              <Link href="/Contact"><a>Contact us</a></Link>
              <Link href="/Doctors"><a>Meet our doctors</a></Link>
              <Link href="/Articles"><a>Articles</a></Link>
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
