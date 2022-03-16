import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Uploader from '../components/Uploader';
import Contact from  '../components/Contact';
import Top from  '../components/Top';
import Donation from '../components/Donation';
import { css, jsx } from '@emotion/react'
import 'scroll-behavior-polyfill';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

// 認証
const init = (account: string, password: string) => {
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
    <Layout title="画像を最適化するオンラインツール" noindex={false} description="画像をさまざまな形に最適化するオンラインツールです。 ぜひご活用ください。" lp={true}>
      <Top />
    </Layout>
  )
}
