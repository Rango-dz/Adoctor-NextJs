import React from 'react';
import HeaderTop from './headerTop';
import HeaderMiddle from './headerMiddle';

export default function Header() {


  return (
    <>
      <header id="header" className="ct-header">
        <HeaderTop />
        <HeaderMiddle />

      </header>
    </>
  )
}
