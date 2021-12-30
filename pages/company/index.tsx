import Layout from '../../components/Layout';
import Company from '../../components/Company';


export default function CompanyIndex() {
  return (
    <Layout title="Company" noindex={false} description='運営会社の情報です。'>
      <Company />
    </Layout>
  );
}
