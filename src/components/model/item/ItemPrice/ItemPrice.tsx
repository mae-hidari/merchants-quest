import { chakra, Flex, FlexProps } from '@chakra-ui/react';
import { FC } from 'react';

import { BaseImage } from '@/components/ui';

export type ItemPricePropsType = Omit<FlexProps, 'prefix'> & {
  prefix?: boolean;
};

export const ItemPrice: FC<ItemPricePropsType> = ({
  children,
  prefix,
  ...flexProps
}) => {
  return (
    <Flex alignItems="center" gap="0.2rem" {...flexProps}>
      {prefix && <chakra.span pr="0.5rem">価値</chakra.span>}
      <BaseImage
        alt={'コイン'}
        height="20px"
        src={`/image/coin.png`}
        width="16px"
      />
      {children}
    </Flex>
  );
};
