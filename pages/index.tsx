import Image from 'next/image'
import React, { useState } from 'react';
import Layout from '../components/Layout';
import Uploader from '../components/Uploader';
import Contact from  '../components/Contact';
import Top from  '../components/Top';
import Donation from '../components/Donation';
import { css, jsx } from '@emotion/react'

export default function Home() {
  return (
    <Layout title="" noindex={false} description="フリー素材サイトShizukuya.orgへようこそ。こちらのサイトの素材はライセンスフリーでご使用いただけます。ぜひご活用ください。">
      <Top />
      <div className="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">
        <Uploader />
        <Donation />
        <Contact />
      </div>
    </Layout>
  )
}
