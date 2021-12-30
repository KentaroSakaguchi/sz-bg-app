import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({children, title = '画像(JPG、PNG）の文字認識を行い、オンランでテキストに変換します。 無料でご利用いただけます。', noindex = false, description}: {children: any, title: string, noindex: boolean, description: string}) {
  return (
    <div>
      <Head>
        { title ? <title>{title + ' | extracttextfromimage.online'}</title> : <title>画像からテキスト抽出オンラインツール</title> }
        <link rel="icon" type="image/png" href="https://extracttextfromimage.online/logo-min.png" sizes="114x114" />
        <meta name="description" content={description} />
        <meta name="twitter:title" content={title ? title + ' | extracttextfromimage.online Shizukuya' : '画像(JPG、PNG）の文字認識を行い、オンランでテキストに変換します。 無料でご利用いただけます。'} />
        <meta property="og:title" content={title ? title + ' | extracttextfromimage.online Shizukuya' : '画像(JPG、PNG）の文字認識を行い、オンランでテキストに変換します。 無料でご利用いただけます。'} />
        <meta name="twitter:description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@shizukuya_jp" />
        <meta name="twitter:creator" content="@shizukuya_jp" />
        <meta name="twitter:url" content="https://extracttextfromimage.online/" />
        <meta property="og:url" content="https://extracttextfromimage.online/" />
        <meta property="og:image" content="https://extracttextfromimage.online/logo.png" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="extracttextfromimage.online Shizukuya" />
        { noindex ? <meta name="robots" content="noindex" /> : <meta name="robots" content="index,follow" /> }
      </Head>
      {children}
      <Footer />
    </div>
  );
}
