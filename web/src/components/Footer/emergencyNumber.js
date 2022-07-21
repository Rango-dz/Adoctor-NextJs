import React from 'react'
import { GiMailbox, GiRotaryPhone } from 'react-icons/gi'
import { formatPhoneNumber } from '../helpers/helpers'
import { useAppContext } from "../Layout";

export default function emergencyNumber(props) {
  // fetching site seettings
  const context = useAppContext();
  const emergency = context[3];

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="500"
      className='flex flex-col md:flex-row absolute -top-14 gap-3 left-0 right-0 justify-around align-middle w-auto mx-[5%] border md:max-w-2xl p-5 md:mx-auto  shadow-blueShadow  custom-glass items-center md:text-lg font-bold hover:bg-gradient-to-bl from-slate-100 to-slate-200 dark:from-moroi-dark dark:to-moroi-dark dark:border-moroi-gray dark:shadow first-letter:cursor-pointer transition-custom dark:bg-moroi-dark'>
      <div className='flex gap-5'>
        <GiRotaryPhone className='text-4xl self-center' />
        <h3 className='flex flex-col'>
          <span className='font-semibold'>Emergency Call</span>
          <a href={`tel:${emergency.phoneNumber}`} className="dark:text-colorRed"> {formatPhoneNumber(emergency.phoneNumber)} </a>
        </h3>
      </div>
      <div className='flex gap-5'>
        <GiMailbox className='text-4xl self-center' />
        <h3 className='flex flex-col'>
          <span className='font-semibold'>24/7 Email Support</span>
          <a href="mailto:Info@Domain.Com" className='dark:text-colorRed'> {emergency.doctoremail} </a>
        </h3>
      </div>
    </div>
  )
}
