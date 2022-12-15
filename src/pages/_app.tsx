import '@fontsource/m-plus-rounded-1c';
import '@fontsource/dotgothic16';

import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import { RecoilRoot } from 'recoil';
import { CHAKRA_THEME } from 'src/constants';

import { UserInitialModal } from '@/components/model/user';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [cookie] = useCookies(['user-data']);

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (!cookie['user-data'] && !isOpen) {
      onOpen();
    }
  }, []);

  return (
    <RecoilRoot>
      <CookiesProvider>
        <ChakraProvider theme={CHAKRA_THEME}>
          <Component {...pageProps} />
          <UserInitialModal isOpen={isOpen} onClose={onClose} />
        </ChakraProvider>
      </CookiesProvider>
    </RecoilRoot>
  );
};

export default MyApp;
