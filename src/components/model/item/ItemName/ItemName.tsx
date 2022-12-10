import { Flex } from '@chakra-ui/react';
import { FC } from 'react';

import { BaseImage } from '@/components/ui';
import { ItemType } from '@/types';

export type ItemNamePropsType = {
  height: string;
  item: ItemType;
  width: string;
};

export const ItemName: FC<ItemNamePropsType> = ({ height, item, width }) => {
  return (
    <Flex alignItems="center" gap="0.3rem">
      <BaseImage
        alt={'アイテム'}
        height={height}
        src={`/image/${item.iconName}.png`}
        width={width}
      />
      {item.name}
    </Flex>
  );
};
