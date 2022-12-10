import { BoxProps, Flex, FlexProps } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

import { PixelFlame } from '@/components/ui/flame';

type ListItemPropsType = BoxProps & {
  children: ReactNode;
  flexProps?: FlexProps;
  title: string;
};

export const ListItem: FC<ListItemPropsType> = ({
  children,
  flexProps,
  title,
  ...boxProps
}) => {
  return (
    <PixelFlame border="1px" h="5rem" pos="relative" w="100%" {...boxProps}>
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
      <Flex alignItems="center" h="full" px="0.5rem" {...flexProps}>
        {children}
      </Flex>
    </PixelFlame>
  );
};
