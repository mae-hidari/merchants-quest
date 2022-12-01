import { ChakraProvider } from '@chakra-ui/react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { CHAKRA_THEME } from 'src/constants';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={CHAKRA_THEME}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
