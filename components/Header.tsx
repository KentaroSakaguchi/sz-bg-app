import React, { useState } from 'react';
import { css, jsx } from '@emotion/react'

export default function Header({}) {
  const [isOpen, toggle] = useState(false);

  const menuOpen = () => {
    toggle(!isOpen)
  };

  return (
    <header className="px-4 h-20 sticky flex justify-center items-center bg-green-400 text-white relative">
      <h1 className="text-4xl">welcome to next.js</h1>
      <nav className="w-12 ml-auto">
        {isOpen ?
          <button type="button" className="relative tham tham-e-spin tham-w-8 tham-active z-10" onClick={menuOpen}>
            <div className="tham-box">
              <div className="tham-inner bg-green-400" />
            </div>
          </button>
          :
          <button type="button" className="relative tham tham-e-spin tham-w-8" onClick={menuOpen}>
            <div className="tham-box">
              <div className="tham-inner bg-white" />
            </div>
          </button>
        }
        {isOpen && <div className="absolute w-screen h-screen bg-white px-4 inset-0 transition-all translate-x-full" css={css`padding: 10px;`}>
          <ul>
            <li>
              <a href="#">a</a>
            </li>
          </ul>
        </div>}
      </nav>
    </header>
  );
}
