import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({children, title = '画像(JPG、PNG）の文字認識を行い、オンランでテキストに変換します。 無料でご利用いただけます。', noindex = false, description, lp = false }: {children: any, title: string, noindex: boolean, description: string, lp: boolean}) {
  return (
    <div>
      <Head>
        { title ? <title>{title + ' | extract text from image online'}</title> : <title>画像からテキスト抽出オンラインツール | extract text from image online</title> }
        <link rel="icon" type="image/png" href="https://extracttextfromimage.online/logo-min.png" sizes="114x114" />
        <meta name="description" content={description} />
        <meta name="twitter:title" content={title ? title + ' | extract text from image online' : '画像(JPG、PNG）の文字認識を行い、オンランでテキストに変換します。 無料でご利用いただけます。'} />
        <meta property="og:title" content={title ? title + ' | extract text from image online' : '画像(JPG、PNG）の文字認識を行い、オンランでテキストに変換します。 無料でご利用いただけます。'} />
        <meta name="twitter:description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@shizukuya_jp" />
        <meta name="twitter:creator" content="@shizukuya_jp" />
        <meta name="twitter:url" content="https://extracttextfromimage.online/" />
        <meta property="og:url" content="https://extracttextfromimage.online/" />
        <meta property="og:image" content="https://extracttextfromimage.online/ogp.png" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content={title ? title + ' | extract text from image online' : '画像からテキスト抽出オンラインツール | extract text from image online' } />
        { noindex ? <meta name="robots" content="noindex" /> : <meta name="robots" content="index,follow" /> }
      </Head>
      { !lp && <Header /> }
      { !lp ?
        <div className="px-8 mt-4 md:mt-16 lg:mt-20">
          {children}
        </div> :
        <div className="md:mt-16 lg:mt-20">
          {children}
        </div>
      }
      <Footer />
    </div>
  );
}
