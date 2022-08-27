import React from 'react'
import Image from 'next/image';
import retour from 'next/router';

function userMenu(props) {
  const user = props.user;

  return (
    <>
      <div className="dropdown inline-block relative mx-auto">
        <Image className='rounded-full cursor-pointer' layout="fixed" width={40} height={40} src={user.picture} alt={user.name} />

        <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 -left-28">
          <li className="rounded-t bg-gray-200  py-2 px-4 block whitespace-no-wrap">{user.name}</li>
          <li className="bg-gray-200  py-2 px-4 block whitespace-no-wrap">{user.email}</li>
          <li className=""><button className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer" onClick={() => retour.push('/api/auth/logout')}>Logout</button></li>
        </ul>
      </div>


    </>
  )
}

export default userMenu