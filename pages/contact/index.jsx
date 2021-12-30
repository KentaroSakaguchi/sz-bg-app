import Layout from '../../components/Layout';
import Contact from '../../components/Contact';


export default function ContactIndex() {
  return (
    <Layout title="Contact" noindex={false} description='お問合せのページです。'>
      <Contact />
    </Layout>
  );
}
