import '../index.css';
import '../global.css';
import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('../src/components/Layout'), {
  suspense: true,
})

export default function MyApp({ Component, pageProps }) {

  return (
    <DynamicHeader>
      <Component {...pageProps} />
    </DynamicHeader>
  );
}