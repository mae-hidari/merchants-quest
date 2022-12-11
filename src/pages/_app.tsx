import { ChakraProvider } from '@chakra-ui/react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import { RecoilRoot } from 'recoil';
import { CHAKRA_THEME } from 'src/constants';

import { TestUser } from '@/data';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [_, setCookie] = useCookies(['user-data']);

  useEffect(() => {
    setCookie('user-data', TestUser);
  }, []);

  return (
    <RecoilRoot>
      <CookiesProvider>
        <ChakraProvider theme={CHAKRA_THEME}>
          <Component {...pageProps} />
        </ChakraProvider>
      </CookiesProvider>
    </RecoilRoot>
  );
};

export default MyApp;
