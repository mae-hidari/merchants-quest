import { ChakraProvider, useDisclosure } from '@chakra-ui/react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import { RecoilRoot } from 'recoil';
import { CHAKRA_THEME } from 'src/constants';

// import { TestUser } from '@/data';
import { UserInitialModal } from '@/components/model/user';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [cookie, setCoolie] = useCookies(['user-data']);

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (!cookie['user-data'] && !isOpen) {
      onOpen();
      // setCoolie('user-data', TestUser);
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
