import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Uploader from '../../components/Uploader';
import Contact from  '../../components/Contact';
import Extract from  '../../components/Extract';
import Donation from '../../components/Donation';
import { css, jsx } from '@emotion/react'
import 'scroll-behavior-polyfill';
import '../../src/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

// 認証
const init = (account: any, password: any) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, account, password)
    .then((userCredential) => {
      return true;
    })
    .catch((error) => {
      console.log('error')
      console.log(error)
      return false;
    });
};

init(process.env.MAIL_ACCOUNT, process.env.MAIL_PASSWORD);

export default function Home() {
  if (typeof window !== 'undefined') {

  }

  return (
    <Layout title="" noindex={false} description="画像(JPG、PNG）の文字認識を行い、オンランでテキストに変換します。 ぜひご活用ください。" lp={true}>
      <Extract />
      <div className="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">
        <Uploader />
        {/* <Donation /> */}
      </div>
    </Layout>
  )
}
