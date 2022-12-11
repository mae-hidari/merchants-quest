import { Box, chakra, Flex } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';

import {
  BaseButton,
  BaseImage,
  BaseModal,
  BaseModalPropsType,
  QrCode,
} from '@/components/ui';
import { RumorType } from '@/types';

export type RumorModalPropsType = Omit<BaseModalPropsType, 'children'> & {
  rumor: RumorType;
};

export const RumorModal: FC<RumorModalPropsType> = ({
  isOpen,
  onClose,
  rumor,
}) => {
  const [mode, setMode] = useState<'desc' | 'expo'>('desc');

  const _onClose = useCallback(() => {
    setMode('desc');
    onClose();
  }, []);

  const desc = {
    content: (
      <chakra.p whiteSpace="pre-wrap">{`${rumor.description}`}</chakra.p>
    ),
    footer: (
      <Flex gap="3rem">
        <BaseButton h="2rem" onClick={_onClose}>
          閉じる
        </BaseButton>
        <BaseButton h="2rem" onClick={() => setMode('expo')}>
          教える
        </BaseButton>
      </Flex>
    ),
    header: (
      <Flex flexDirection="column">
        <Flex alignItems="center" justifyContent="center">
          <BaseImage
            alt={'吹き出し'}
            height="19px"
            src={'/image/bubble.png'}
            width="16px"
          />
          うわさ{rumor.id}
        </Flex>
        <Box>「{rumor.title}」</Box>
      </Flex>
    ),
  };

  const expo = {
    content: (
      <Flex alignItems="center">
        <QrCode code={rumor.code} />
      </Flex>
    ),
    footer: (
      <Flex gap="1rem">
        <BaseButton h="2rem" onClick={_onClose}>
          閉じる
        </BaseButton>
      </Flex>
    ),
    header: (
      <Flex flexDirection="column" gap="1rem">
        <Flex justifyContent="center">{rumor.title}を教える</Flex>
        <chakra.p fontSize="sm">※うわさを教えても無くならない。</chakra.p>
      </Flex>
    ),
  };

  return (
    <>
      <BaseModal
        {...(mode === 'desc' && desc)}
        {...(mode === 'expo' && expo)}
        isOpen={isOpen}
        onClose={_onClose}
      ></BaseModal>
    </>
  );
};
