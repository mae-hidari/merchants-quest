import { Flex } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';

import {
  BaseButton,
  BaseModal,
  BaseModalPropsType,
  QrReader,
} from '@/components/ui';
import { useUserData } from '@/hooks';
import { RumorType, ScanProtocolType } from '@/types';

export type RumorImportModalType = Omit<BaseModalPropsType, 'children'>;

export const RumorImportModal: FC<RumorImportModalType> = ({
  isOpen,
  onClose,
}) => {
  const [mode, setMode] = useState<'scan' | 'success' | 'failed'>('scan');
  const [received, setReceived] = useState<{
    name: string;
    rumor: RumorType;
  } | null>(null);
  const { addRumor } = useUserData();

  const onScan = useCallback(
    (data: ScanProtocolType) => {
      addRumor(data, {
        failed: () => {
          setMode('failed');
        },
        success: (rumor) => {
          setReceived({ name: data.name, rumor });
          setMode('success');
        },
      });
    },
    [addRumor],
  );

  const _onClose = useCallback(() => {
    setMode('scan');
    setReceived(null);
    onClose();
  }, []);

  const scan = {
    content: (
      <Flex alignItems="center" flexDirection="column" w="full">
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
    header: <span>結果を読取る</span>,
  };

  const success = {
    content: (
      <Flex justifyContent="center" w="full">
        <p>
          {received?.name} から
          <br />
          {received?.rumor.title} を教わった。
        </p>
      </Flex>
    ),
    footer: (
      <Flex gap="1rem">
        <BaseButton h="2rem" onClick={_onClose}>
          閉じる
        </BaseButton>
      </Flex>
    ),
    header: <span>成功！</span>,
  };

  const failed = {
    content: (
      <Flex alignItems="center" flexDirection="column" w="full">
        取引に失敗した...
      </Flex>
    ),
    footer: (
      <Flex gap="1rem">
        <BaseButton h="2rem" onClick={_onClose}>
          閉じる
        </BaseButton>
      </Flex>
    ),
    header: <span>失敗...</span>,
  };

  return (
    <>
      <BaseModal
        {...(mode === 'scan' && scan)}
        {...(mode === 'success' && success)}
        {...(mode === 'failed' && failed)}
        isOpen={isOpen}
        onClose={onClose}
      ></BaseModal>
    </>
  );
};
