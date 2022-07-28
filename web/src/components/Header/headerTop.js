import React from 'react'
import Social from './social'
import { formatPhoneNumber } from '../../../lib/helpers';

export default function HeaderTop(props) {
  // fetching site seettings
  const emergency = props.headertop


  return (
    < >
      <div data-row="top" className="flex flex-col md:flex-row justify-around md:py-3 py-8">

        <div className="flex flex-row align-middle justify-center font-semibold gap-2 text-lg ">
          Emergency <span className='text-colorOne dark:text-colorRed'> {emergency && formatPhoneNumber(emergency.phoneNumber)}</span>
        </div>
        <div className="">
          <Social social={emergency} />
        </div>
      </div>
    </>
  )
}