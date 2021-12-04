import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({children, title = 'フリー素材サイト Shizukuya.org made by Shizukuya', noindex = false, description}: {children: any, title: string, noindex: boolean, description: string}) {
  return (
    <div>
      <Head>
        { title ? <title>{title + ' | Shizukuya.org'}</title> : <title>フリー素材サイト Shizukuya.org made by Shizukuya</title> }
        <link rel="icon" type="image/png" href="/org.png" sizes="114x114" />
        <meta name="description" content={description} />
        <meta name="twitter:title" content={title ? title + ' | Shizukuya.org Shizukuya' : 'フリー素材サイト Shizukuya.org made by Shizukuya'} />
        <meta property="og:title" content={title ? title + ' | Shizukuya.org Shizukuya' : 'フリー素材サイト Shizukuya.org made by Shizukuya'} />
        <meta name="twitter:description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@shizukuya_jp" />
        <meta name="twitter:creator" content="@shizukuya_jp" />
        <meta name="twitter:url" content="https://shizukuya.org/" />
        <meta property="og:url" content="https://shizukuya.org/" />
        <meta property="og:image" content="https://shizukuya.org/shizukuya-ogp.png" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Shizukuya.org Shizukuya" />
        { noindex ? <meta name="robots" content="noindex" /> : <meta name="robots" content="index,follow" /> }
      </Head>
      {children}
      <Footer />
    </div>
  );
}
