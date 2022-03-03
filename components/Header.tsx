import React, { useState } from 'react';
import { css, jsx } from '@emotion/react';
import { Mediaquery } from '../util/Style.config';

export default function Header({}) {
  const [isOpen, toggle] = useState(false);

  const menuOpen = () => {
    toggle(!isOpen)
  };

  const HeaderStyle = css`
    padding-bottom: 16px;
    z-index: 2;

    ${Mediaquery[0]} {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
    }`;


  return (
    <div css={HeaderStyle} className="bg-white">
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <a href="/">
                <span className="sr-only">Top page</span>
                <img className="h-8 w-auto sm:h-10" src="/logo.png" />
              </a>
              <div className="-mr-2 flex items-center md:hidden">
                <button onClick={menuOpen} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
                  <span className="sr-only">Open main menu</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
            <a href="/generater" className="font-medium text-gray-500 hover:text-gray-900">LP作成ツール</a>
            <a href="/extract" className="font-medium text-gray-500 hover:text-gray-900">画像からテキスト抽出ツール</a>
            <a href="/webp" className="font-medium text-gray-500 hover:text-gray-900">画像をWebPに変換</a>
            <a href="/contact" className="font-medium text-gray-500 hover:text-gray-900">Contact</a>

            {/* <a href="#" className="font-medium text-gray-500 hover:text-gray-900">Company</a>

            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</a> */}
          </div>
        </nav>
      </div>

      {isOpen &&
        <div className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <img className="h-8 w-auto" src="/logo.png" alt="" />
              </div>
              <div className="-mr-2">
                <button onClick={menuOpen} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close main menu</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/generater" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">LP作成ツール</a>
              <a href="/extract" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">画像からテキスト抽出ツール</a>
              <a href="/webp" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">画像をWebPに変換</a>
              <a href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Contact</a>
              {/* <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Company</a> */}
            </div>
            {/* <a href="#" className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100">
              Log in
            </a> */}
          </div>
        </div>
      }
    </div>
  );
}
