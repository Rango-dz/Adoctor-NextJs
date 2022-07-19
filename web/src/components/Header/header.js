import React from 'react';
import HeaderTop from './headerTop';
import HeaderMiddle from './headerMiddle';

export default function Header(props) {
  return (
    <header id="header" className="ct-header">
      <HeaderTop props={props} />
      <HeaderMiddle props={props} />

    </header>
  )
}
