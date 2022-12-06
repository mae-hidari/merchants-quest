import { BoxProps, chakra } from '@chakra-ui/react';
import { FC } from 'react';

import { PixelFlame } from '@/components/ui/flame';

type BaseHeaderPropsType = BoxProps;

export const BaseHeader: FC<BaseHeaderPropsType> = ({ ...boxProps }) => {
  return (
    <PixelFlame
      alignItems="center"
      display="flex"
      justifyContent="center"
      w="100%"
      {...boxProps}
    >
      <chakra.span fontSize="2xl" fontWeight="bold">
        MerchantsQuest
      </chakra.span>
    </PixelFlame>
  );
};
