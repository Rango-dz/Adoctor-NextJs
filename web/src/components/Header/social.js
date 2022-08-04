import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPinterest } from 'react-icons/fa'
import Skeleton from '@mui/material/Skeleton'

export default function social(props) {

  // fetching site seettings
  const social = props.social;

  if (!social) {
    return (<Skeleton count={1} />)
  }
  return (
    <div className="flex flex-row align-middle justify-center">
      <a href={social.Facebook} aria-label="Follow me on Facebook" className="text-[#557dbc] ct-icon m-2 cursor-pointer hover:transition hover:opacity-70"> <FaFacebook className="w-5" aria-hidden="true" /> </a>
      <a href={social.Twitter} aria-label="Follow me on Twitter" className="text-[#7acdee] ct-icon m-2 cursor-pointer hover:transition hover:opacity-70"> <FaTwitter className="w-5" aria-hidden="true" /> </a>
      <a href={social.Instagram} aria-label="Follow me on Instagram" className="text-[#ed1376] ct-icon m-2 cursor-pointer hover:transition hover:opacity-70"> <FaInstagram className="w-5" aria-hidden="true" /> </a>
      <a href={social.Pinterest} aria-label="Follow me on Pinterest" className="text-[#ea575a] ct-icon m-2 cursor-pointer hover:transition hover:opacity-70"> <FaPinterest className="w-5" aria-hidden="true" /></a>
      <a href={social.Youtube} aria-label="Follow me on Youtube" className="text-[#FF0000] ct-icon m-2 cursor-pointer hover:transition hover:opacity-70"> <FaYoutube className="w-5" aria-hidden="true" /> </a>
    </div>
  )
}
