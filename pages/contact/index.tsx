import Layout from '../../components/Layout';
import Contact from '../../components/Contact';


export default function ContactIndex() {
  return (
    <Layout title="Contact お問合せ" noindex={false} description='お問合せはこちらのフォームへ。' lp={false}>
      <Contact />
    </Layout>
  );
}
