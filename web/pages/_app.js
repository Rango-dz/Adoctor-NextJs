import '../index.css';
import '../global.css';
import dynamic from 'next/dynamic'
import Layout from '../src/components/Layout';

const DynamicHeader = dynamic(() => import('../components/header'), {
  suspense: true,
})

export default function MyApp({ Component, pageProps }) {

  return (
    <DynamicHeader>
      <Component {...pageProps} />
    </DynamicHeader>
  );
}