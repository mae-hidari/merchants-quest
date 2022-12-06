import { Box, BoxProps } from '@chakra-ui/react';
import { FC } from 'react';

type PixelFlamePropsType = BoxProps;

export const PixelFlame: FC<PixelFlamePropsType> = ({
  children,
  ...boxProps
}) => {
  return (
    <Box
      border="2px"
      borderColor="white"
      h="full"
      rounded="sm"
      w="full"
      {...boxProps}
    >
      {children}
    </Box>
  );
};
