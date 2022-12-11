import { chakra, Flex } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';

import {
  BaseButton,
  BaseModal,
  BaseModalPropsType,
  QrReader,
  useTimeLoadingButton,
} from '@/components/ui';
import { useTransactions } from '@/hooks';
import { ItemType, ScanProtocolType } from '@/types';

export type ItemImportModalType = Omit<BaseModalPropsType, 'children'>;

export const ItemImportModal: FC<ItemImportModalType> = ({
  isOpen,
  onClose,
}) => {
  const [mode, setMode] = useState<
    'scan' | 'success' | 'failed' | 'failed:alreadyHave'
  >('scan');

  const [received, setReceived] = useState<{
    item: ItemType;
    name: string;
  } | null>(null);

  const { addItem } = useTransactions();

  const { TimeLoadingButton, clearTimer, startTimer } = useTimeLoadingButton(
    {},
  );

  useEffect(() => {
    if (mode === 'failed' || mode === 'failed:alreadyHave') {
      startTimer();
      return () => {
        clearTimer();
      };
    }
  }, [mode]);

  const onScan = useCallback(
    (data: ScanProtocolType) => {
      addItem(data, {
        failed: (reason) => {
          if (reason === 'already have') {
            setMode('failed:alreadyHave');
          } else {
            setMode('failed');
          }
        },
        success: (item) => {
          setReceived({ item, name: data.name });
          setMode('success');
        },
      });
    },
    [addItem],
  );

  const _onClose = useCallback(() => {
    setMode('scan');
    setReceived(null);
    onClose();
  }, []);

  const scan = {
    content: (
      <Flex alignItems="center" flexDirection="column" w="full">
        <chakra.p fontSize="sm" mb="1rem">
          ※既に所持しているアイテムは受け取れない
        </chakra.p>
        <QrReader onResult={onScan} />
      </Flex>
    ),
    footer: (
      <Flex gap="1rem">
        <BaseButton h="2rem" onClick={_onClose}>
          閉じる
        </BaseButton>
      </Flex>
    ),
    header: <span>アイテムQRコードを読取る</span>,
  };

  const success = {
    content: (
      <Flex justifyContent="center" w="full">
        <p>
          {received?.name} から
          <br />
          {received?.item.name} を受け取った。
        </p>
      </Flex>
    ),
    footer: (
      <Flex gap="1rem">
        <TimeLoadingButton h="2rem" onClick={_onClose}>
          閉じる
        </TimeLoadingButton>
      </Flex>
    ),
    header: <span>成功！</span>,
  };

  const failed = {
    content: (
      <Flex alignItems="center" justifyContent="center" w="full">
        {mode === 'failed:alreadyHave' ? (
          <span>このアイテムは既に持っているため受け取れない。</span>
        ) : (
          <span> 取引に失敗した...</span>
        )}{' '}
      </Flex>
    ),
    footer: (
      <Flex gap="1rem">
        <TimeLoadingButton h="2rem" onClick={_onClose}>
          閉じる
        </TimeLoadingButton>
      </Flex>
    ),
    header: <span>失敗</span>,
  };

  return (
    <>
      <BaseModal
        {...(mode === 'scan' && scan)}
        {...(mode === 'success' && success)}
        {...((mode === 'failed' || mode === 'failed:alreadyHave') && failed)}
        isOpen={isOpen}
        onClose={onClose}
      ></BaseModal>
    </>
  );
};
