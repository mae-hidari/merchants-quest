import { BoxProps, Flex } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

import { PixelFlame } from '@/components/ui/flame';

type ItemPropsType = BoxProps & {
  content: ReactElement;
  title: string;
};

export const Item: FC<ItemPropsType> = ({ content, title, ...boxProps }) => {
  return (
    <PixelFlame border="1px" h="5rem" pos="relative" w="100%" {...boxProps}>
      <Flex alignItems="center" h="full" pl="0.5rem">
        <PixelFlame
          alignItems="center"
          bg="black"
          border="1px"
          display="flex"
          h="40%"
          left="2"
          pl="0.4rem"
          pos="absolute"
          top="-4"
          w="40%"
        >
          {title}
        </PixelFlame>
        {content}
      </Flex>
    </PixelFlame>
  );
};
