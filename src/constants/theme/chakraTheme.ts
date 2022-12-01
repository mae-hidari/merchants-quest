import { extendTheme } from '@chakra-ui/react';

const chakraComponentStyle = {
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
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      },
    },
  },
});
