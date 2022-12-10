import { chakra, Flex, ListItem, OrderedList, VStack } from '@chakra-ui/react';
import { useQRCode } from 'next-qrcode';
import { FC, useCallback, useState } from 'react';

import { ItemName } from '@/components/model/item/ItemName';
import { ItemPrice } from '@/components/model/item/ItemPrice';
import { BaseButton, BaseModal, BaseModalPropsType } from '@/components/ui';
import { ItemType } from '@/types';

export type ItemModalPropsType = Omit<BaseModalPropsType, 'children'> & {
  item: ItemType;
};

export const ItemModal: FC<ItemModalPropsType> = ({
  isOpen,
  item,
  onClose,
}) => {
  const [mode, setMode] = useState<'desc' | 'ready' | 'expo' | 'result'>(
    'desc',
  );
  const { Canvas } = useQRCode();

  const _onClose = useCallback(() => {
    setMode('desc');
    onClose();
  }, []);

  const desc = {
    content: (
      <Flex alignItems="center" flexDirection="column">
        <ItemPrice prefix p="2rem">
          {item.price}
        </ItemPrice>
        <chakra.p whiteSpace="pre-wrap">{`${item.description}`}</chakra.p>
      </Flex>
    ),
    footer: (
      <Flex gap="1rem">
        <BaseButton h="2rem" onClick={_onClose}>
          閉じる
        </BaseButton>
        <BaseButton h="2rem" onClick={() => setMode('ready')}>
          渡す
        </BaseButton>
      </Flex>
    ),
    header: <ItemName height="29px" item={item} width="25px"></ItemName>,
  };

  const ready = {
    content: (
      <Flex alignItems="center" flexDirection="column">
        <ItemPrice prefix p="2rem">
          {item.price}
        </ItemPrice>
        <VStack fontSize="1.1rem" spacing="1rem">
          <p>取引の流れ</p>
          <OrderedList pl="2rem" spacing="1rem">
            <ListItem>アイテムQRコードを相手に読み込んでもらう</ListItem>
            <ListItem>相手の画面に表示された結果QRコード読取る</ListItem>
          </OrderedList>
        </VStack>
      </Flex>
    ),
    footer: (
      <Flex gap="1rem">
        <BaseButton h="2rem" onClick={() => setMode('desc')}>
          戻る
        </BaseButton>
        <BaseButton h="2rem" onClick={() => setMode('expo')}>
          開始
        </BaseButton>
      </Flex>
    ),
    header: (
      <Flex>
        <ItemName height="29px" item={item} width="25px"></ItemName>
        <span>を渡す</span>
      </Flex>
    ),
  };

  const expo = {
    content: (
      <Flex alignItems="center" flexDirection="column">
        <Flex flexDirection="column" justifyContent="end" p="2rem">
          <ItemName height="24px" item={item} width="20px"></ItemName>
          <ItemPrice>{item.price}</ItemPrice>
        </Flex>
        <Canvas
          options={{
            color: {
              dark: '#000000',
              light: '#ffffff',
            },
            level: 'L',
            margin: 2,
            scale: 1,
            width: 150,
          }}
          text={item.code}
        />
      </Flex>
    ),
    footer: (
      <Flex gap="1rem">
        <BaseButton h="2rem" onClick={_onClose}>
          キャンセル
        </BaseButton>
        <BaseButton h="2rem" onClick={() => setMode('result')}>
          結果読取
        </BaseButton>
      </Flex>
    ),
    header: <span>アイテムQRコード</span>,
  };

  const result = {
    content: <Flex alignItems="center" flexDirection="column" w="full"></Flex>,
    footer: (
      <Flex gap="1rem">
        <BaseButton h="2rem" onClick={_onClose}>
          閉じる
        </BaseButton>
      </Flex>
    ),
    header: <span>結果を読取る</span>,
  };

  return (
    <>
      <BaseModal
        {...(mode === 'desc' && desc)}
        {...(mode === 'ready' && ready)}
        {...(mode === 'expo' && expo)}
        {...(mode === 'result' && result)}
        isOpen={isOpen}
        onClose={_onClose}
      ></BaseModal>
    </>
  );
};
