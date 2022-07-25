import '../index.css';
import '../global.css';
import Layout from '../src/components/Layout';

export default function MyApp({ Component, pageProps }) {

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}