import { extendTheme } from '@chakra-ui/react';

import { modalTheme } from '@/constants/theme/modalTheme';

const chakraComponentStyle = {
  Modal: modalTheme,
  Spinner: {
    baseStyle: {
      color: 'primary',
    },
  },
};

export const CHAKRA_THEME = extendTheme({
  colors: { primary: '#000000', secondary: '#000000' },
  components: { ...chakraComponentStyle },
  styles: {
    global: {
      body: {
        bgColor: 'black',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      },
    },
  },
});
