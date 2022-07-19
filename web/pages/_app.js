import '../index.css';
import '../global.css';
import Layout from '../src/components/Layout';


export default function MyApp({ Component, pageProps }) {
  // initialize aos animation


  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}