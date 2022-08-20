import '../index.css';
import '../global.css';
import { UserProvider } from '@auth0/nextjs-auth0';

export default function MyApp({ Component, pageProps }) {

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}