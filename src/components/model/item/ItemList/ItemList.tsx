import { StackProps, useDisclosure, VStack } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';

import { ItemModal } from '@/components/model/item/ItemModal';
import { ItemName } from '@/components/model/item/ItemName';
import { ItemPrice } from '@/components/model/item/ItemPrice';
import { ListItem } from '@/components/ui';
import { ItemType } from '@/types';

export type ItemListPropsType = StackProps & {
  items: ItemType[];
};

export const ItemList: FC<ItemListPropsType> = ({ items, ...stackProps }) => {
  const [currentItem, setCurrentItem] = useState<ItemType | null>();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const onClickItem = useCallback((Item: ItemType) => {
    setCurrentItem(Item);
    onOpen();
  }, []);

  return (
    <>
      <VStack pb="1rem" pt="2rem" px="1rem" spacing="2rem" {...stackProps}>
        {items.map((item) => (
          <ListItem
            flexProps={{
              fontSize: 'xl',
              gap: '0.2rem',
              justifyContent: 'space-between',
            }}
            key={item.code}
            title={`アイテム${item.id}`}
            onClick={() => onClickItem(item)}
          >
            <ItemName height="24px" item={item} width="20px"></ItemName>
            <ItemPrice>{item.price}</ItemPrice>
          </ListItem>
        ))}
      </VStack>
      {currentItem && (
        <ItemModal isOpen={isOpen} item={currentItem} onClose={onClose} />
      )}
    </>
  );
};
