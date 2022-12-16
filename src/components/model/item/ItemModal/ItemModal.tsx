import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  chakra,
  Flex,
  HStack,
  ListItem,
  OrderedList,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';

import { ItemName } from '@/components/model/item/ItemName';
import { ItemPrice } from '@/components/model/item/ItemPrice';
import {
  BaseButton,
  BaseModal,
  BaseModalPropsType,
  QrCode,
  SelectButton,
  useTimeLoadingButton,
} from '@/components/ui';
import { useTransactions } from '@/hooks';
import { ItemType } from '@/types';

export type ItemModalPropsType = Omit<BaseModalPropsType, 'children'> & {
  item: ItemType;
};

export const ItemModal: FC<ItemModalPropsType> = ({
  isOpen,
  item,
  onClose,
}) => {
  const [mode, setMode] = useState<
    'desc' | 'ready' | 'expo' | 'result' | 'delete'
  >('desc');
  const [tranResult, setTranResult] = useState<'success' | 'failed'>('failed');
  const { removeItem } = useTransactions();

  const { TimeLoadingButton, clearTimer, startTimer } = useTimeLoadingButton({
    countDownTime: 2,
  });

  useEffect(() => {
    if (mode === 'result') {
      startTimer();
      return () => {
        clearTimer();
      };
    }
  }, [mode]);

  const _onClose = useCallback(() => {
    setMode('desc');
    setTranResult('failed');
    onClose();
  }, []);

  const onClickSelect = useCallback(
    (label: string) => {
      if (label === tranResult) return;
      setTranResult((current) =>
        current === 'success' ? 'failed' : 'success',
      );
    },
    [tranResult],
  );

  const onClickFinish = useCallback(() => {
    if (tranResult === 'success') {
      removeItem(item, { failed: _onClose, success: _onClose });
    } else {
      _onClose();
    }
  }, [item, tranResult]);

  const onClickDelete = useCallback(() => {
    removeItem(item, { failed: _onClose, success: _onClose });
  }, [item]);

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
      <Flex gap="3rem">
        <BaseButton h="2rem" onClick={_onClose}>
          閉じる
        </BaseButton>
        <BaseButton h="2rem" onClick={() => setMode('ready')}>
          渡す
        </BaseButton>
      </Flex>
    ),
    header: (
      <Flex alignContent="center" w="full">
        <Spacer />
        <Box pl="1.25rem">
          <ItemName height="29px" item={item} width="25px"></ItemName>
        </Box>
        <Spacer />
        <Box lineHeight="normal" onClick={() => setMode('delete')}>
          <DeleteIcon />
        </Box>
      </Flex>
    ),
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
            <ListItem>相手の画面に表示された結果を選択する</ListItem>
          </OrderedList>
        </VStack>
      </Flex>
    ),
    footer: (
      <Flex gap="3rem">
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
          <ItemPrice gap="0.5rem">{item.price}</ItemPrice>
        </Flex>
        <QrCode code={item.code} />
      </Flex>
    ),
    footer: (
      <Flex gap="1rem">
        <BaseButton h="2rem" onClick={() => setMode('result')}>
          結果選択
        </BaseButton>
      </Flex>
    ),
    header: <span>アイテムQRコード</span>,
  };

  const result = {
    content: (
      <HStack spacing="1rem">
        <SelectButton
          fontSize="1.2rem"
          selected={tranResult === 'success'}
          onClick={() => onClickSelect('success')}
        >
          成功！
        </SelectButton>
        <SelectButton
          fontSize="1.2rem"
          selected={tranResult === 'failed'}
          onClick={() => onClickSelect('failed')}
        >
          失敗
        </SelectButton>
      </HStack>
    ),
    footer: (
      <Flex gap="1rem">
        <TimeLoadingButton h="2rem" onClick={onClickFinish}>
          決定
        </TimeLoadingButton>
      </Flex>
    ),
    header: <span>取引結果を選択</span>,
  };

  const deleteItem = {
    content: (
      <Flex alignItems="center">
        {item.id === 2 ? (
          <Text color="red">
            このアイテムは呪われています！
            <br />
            捨てることはできません。
          </Text>
        ) : (
          <Text>このアイテムを本当に捨てますか？</Text>
        )}
      </Flex>
    ),
    footer: (
      <Flex gap="3rem">
        <BaseButton h="2rem" onClick={() => setMode('desc')}>
          戻る
        </BaseButton>
        {item.id !== 2 && (
          <BaseButton h="2rem" onClick={onClickDelete}>
            捨てる
          </BaseButton>
        )}
      </Flex>
    ),
    header: (
      <Flex>
        <ItemName height="29px" item={item} width="25px"></ItemName>
      </Flex>
    ),
  };

  return (
    <>
      <BaseModal
        {...(mode === 'desc' && desc)}
        {...(mode === 'ready' && ready)}
        {...(mode === 'expo' && expo)}
        {...(mode === 'result' && result)}
        {...(mode === 'delete' && deleteItem)}
        isOpen={isOpen}
        onClose={_onClose}
      ></BaseModal>
    </>
  );
};
