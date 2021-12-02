import Image from 'next/image'
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { css, jsx } from '@emotion/react'

export default function Home() {
  return (
    <Layout title="" noindex={false} description="フリー素材サイトShizukuya.orgへようこそ。こちらのサイトの素材はライセンスフリーでご使用いただけます。ぜひご活用ください。">
      <div css={css`padding: 10px;`}>test</div>
    </Layout>
  )
}
