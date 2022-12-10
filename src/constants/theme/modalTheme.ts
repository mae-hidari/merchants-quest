import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  dialog: {
    bg: `black`,
    borderColor: 'white',
    borderRadius: 'sm',
    color: 'white',
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
