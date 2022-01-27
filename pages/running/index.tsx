import Image from 'next/image'
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Running from '../../components/Running';

import { css, jsx } from '@emotion/react'

export default function RunningPage() {
  return (
    <Layout title="" noindex={false} description="画像(JPG、PNG）の文字認識を行い、オンランでテキストに変換します。 無料でご利用いただけます。ぜひご活用ください。" lp={false}>
      <div className="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16">
        <Running />
      </div>
    </Layout>
  )
}
