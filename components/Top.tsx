import React, { useState } from 'react';
import Header from './Header';
import MediaCard from './Card';
import { css, jsx } from '@emotion/react';
import { Mediaquery } from '../util/Style.config';

const wrapper = css`
  display: flex;
  flex-direction: column;

  ${Mediaquery[0]} {
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
`;

const cardWrapper = css`
  margin-top: 16px;
  display: flex;
  justify-content: center;

  ${Mediaquery[0]} {
    margin-right: 32px;
  }
`;

export default function Top({}) {
  return (
    <div className="relative bg-white overflow-hidden">
      <Header />
      <div className="relative overflow-hidden">
        <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
            <div className="sm:max-w-lg">
            <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              画像を最適化する<br />Optimize the image
              </h1>
              <p className="mt-4 text-xl text-gray-500">画像をさまざまな形に最適化する、オンラインツール</p>
            </div>
            <div>
              <div className="mt-10">
                <div aria-hidden="true" className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full">
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                          <img src="/iStock-1167885500.webp" alt="" className="w-full h-full object-center object-cover" />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img src="/iStock-1181169462.webp" alt="" className="w-full h-full object-center object-cover" />
                        </div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img src="/iStock-1177479373.webp" alt="" className="w-full h-full object-center object-cover" />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img src="/iStock-1172891970.webp" alt="" className="w-full h-full object-center object-cover" />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img src="/iStock-1171143007.webp" alt="" className="w-full h-full object-center object-cover" />
                        </div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img src="/iStock-1161358581.webp" alt="" className="w-full h-full object-center object-cover" />
                        </div>
                        <div className="w-44 h-64 rounded-lg overflow-hidden">
                          <img src="/iStock-1216706463.webp" alt="" className="w-full h-full object-center object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="#menu" className="inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700">メニュー</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="px-8">
        <div className="relative overflow-hidden">
          <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48" id="menu">
            <h2 className="text-xl font-bold">Menu</h2>
            <div css={wrapper}>
              <div css={cardWrapper}>
                <MediaCard title="LP作成ツール" image="/iStock-1217908164.jpg" text="コードを書かずにオンライン上でLPを制作できます。" href="/generater"/>
              </div>
              <div css={cardWrapper}>
                <MediaCard title="画像からテキスト抽出ツール" image="/iStock-1186357899.webp" text="画像(JPG、PNG）の文字認識を行い、テキストに変換します。" href="/extract"/>
              </div>
              <div css={cardWrapper}>
                <MediaCard title="画像からWebPコンバーター" image="/iStock-1152109336.webp" text="画像(JPG、PNG）からWebPへの変換ツールです。" href="/webp" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
