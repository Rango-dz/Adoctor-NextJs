import React from 'react'
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react';
import Link from 'next/link';
import { GiClockwork, GiFirstAidKit } from 'react-icons/gi';
import { useCallback } from 'react';
import { useEffect } from 'react';
import Image from 'next/image'

export default function SectionDoctor(props) {


  const doctor = props.doctorSettings;

  const [today, setToday] = React.useState(new Date());

  const getTodayName = useCallback(() => {
    const options = { weekday: 'long' };
    const openDay = new Date().toLocaleDateString(undefined, options)
    setToday(openDay);
  }, []);

  useEffect(() => {
    getTodayName();
  }, [getTodayName])




  return (
    <div className="md:my-[15%] my-[45%] mx-[5%] md:mx-[10%] grid grid-cols-1 lg:grid-cols-2 justify-center align-middle md:flex-row gap-10 transition-all ease-in-out delay-500 overflow-hidden">
      <div className=' h-auto md:self-center bg-slate-200 dark:bg-moroi-dark rounded-lg p-5'>
        <h2 className="text-4xl font-bold tracking-tight text-heading lg:text-5xl mb-5 md:text-center">Bring Care With One Click</h2>
        <h3 className='my-5 text-lg tracking-tight text-heading lg:text-xl font-semibold text-colorOne dark:text-colorRed antialiased md:text-center'>Improving The Quality Of Your Life Through Better Health.</h3>
        <p className=" mb-10"> {doctor.text[0].children[0].text} </p>

        <Tabs value="SPECIALTIES">
          <TabsHeader className='flex flex-col md:flex-row bg-colorSix'>
            <Tab key='SPECIALTIES' value='SPECIALTIES' className='p-5'>
              <span className='flex gap-1 '><GiFirstAidKit className='text-colorOne dark:text-colorRed self-center text-3xl' />SPECIALTIES</span>
            </Tab>
            <Tab key='Opening' value='Opening' className='p-5'>
              <span className='flex gap-1  '><GiClockwork className='text-colorOne dark:text-colorRed self-center text-3xl' />Opening Hours</span>
            </Tab>
          </TabsHeader>
          <TabsBody>
            <TabPanel key='SPECIALTIES' value='SPECIALTIES'>
              <ul>
                {
                  doctor.Expertise.map((item, index) => {
                    return (
                      <li key={index} className='flex gap-1 font-medium dark:text-colorSix'>
                        <GiFirstAidKit className='text-colorOne dark:text-colorRed self-center' />
                        {item.value}
                      </li>
                    )
                  })
                }
              </ul>
            </TabPanel>
            <TabPanel key='Opening' value='Opening'>
              <ul>
                {
                  doctor.openingHours.map((item, index) => {
                    return (
                      <div key={index} className="bg-white dark:bg-moroi-stack dark:bg-opacity-50 grid grid-cols-2 mx-auto justify-center align-middle  max-w-sm p-2 rounded shadow-md border dark:border-moroi-gray dark:hover:bg-moroi-stack hover:bg-slate-50 hover:shadow-md m-2 dark:text-colorSix">
                        <div className={today === item.day ? "relative text-colorOne dark:text-colorRed font-medium border-r p-1 before:absolute before:z-10 before:-left-2 before:top-0 before:bottom-0 before:block before:content-[''] before:w-1 before:rounded-tr-full before:rounded-br-full before:bg-colorOne dark:before:bg-colorRed" : "font-medium border-r p-1 "}>{item.day}</div>
                        <div className={today === item.day ? 'text-colorOne dark:text-colorRed font-medium p-1 text-center' : 'font-medium p-1 text-center'}>{item.opensAt} - {item.closesAt}</div>
                      </div>

                    )
                  })
                }
              </ul>
            </TabPanel>
          </TabsBody>
        </Tabs>


        <div className='flex justify-center'>
          <Link href="/About" className='bg-colorEight text-colorOne dark:text-colorRed border-colorSix m-2 p-2 md:p-4 border  rounded-lg md:m-5  dark:shadow-none hover:dark:shadow-md hover:shadow  shadow-md'><a>About us</a></Link>
          <Link href="/Contact" className='bg-colorOne dark:bg-colorRed m-1 p-2 md:p-4 md:m-5 hover:dark:shadow-md rounded-lg align-middle self-center hover:shadow shadow-md  dark:hover:bg-colorRed text-white  dark:shadow-none' ><a>Contact us</a></Link>
        </div>
      </div>
      <div className='relative self-center w-[390px] h-auto mx-auto'>
        <Image src={doctor.image.asset.url} layout='responsive' width={390} height={500} alt={doctor.name} className="rounded-xl z-0" />
        <div
          data-aos="fade-up"
          data-aos-duration="500"
          className="bg-slate-400 -mt-20 max-w-sm border-slate-100 border z-50 p-5 rounded w-auto custom-glass2 bg-opacity-30">

          <h1 className='font-semibold text-xl text-white'>{doctor.name}</h1>
          <h1 className='font-bold text-2xl text-white'> {doctor.Speicialties} </h1>

        </div>

      </div>
    </div>
  )
}
