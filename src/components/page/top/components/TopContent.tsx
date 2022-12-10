import {
  BoxProps,
  HStack,
  StackProps,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';

import { RumorImportModal } from '@/components/model';
import { ItemList } from '@/components/model/item';
import { RumorList } from '@/components/model/rumor/RumorList/RumorList';
import { useTopContent } from '@/components/page/top/use-top-content';
import { BaseButton, PixelFlame } from '@/components/ui';

type TopPageModeType = 'rumor' | 'item';

export type TopContentPropsType = StackProps;

export const TopContent: FC<BoxProps> = ({ ...restProps }) => {
  const { items, rumors, user } = useTopContent();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [mode, setMode] = useState<TopPageModeType>('rumor');

  const onClickModeTab = useCallback(
    (currentMode: TopPageModeType) => {
      if (currentMode === mode) return;
      setMode((current) => (current === 'item' ? 'rumor' : 'item'));
    },
    [mode],
  );

  return (
    <>
      <VStack align="stretch" mt="5px" spacing="5px" {...restProps}>
        <HStack h="9%">
          <PixelFlame
            alignItems="center"
            display="flex"
            fontSize="lg"
            pl="1rem"
          >
            {user?.name}
          </PixelFlame>
          {mode === 'rumor' && (
            <PixelFlame
              alignItems="center"
              display="flex"
              fontSize="lg"
              pl="1rem"
              onClick={onOpen}
            >
              うわさを教わる
            </PixelFlame>
          )}
          {mode === 'item' && (
            <PixelFlame
              alignItems="center"
              display="flex"
              fontSize="lg"
              pl="1rem"
            >
              アイテムを貰う
            </PixelFlame>
          )}
        </HStack>

        <PixelFlame h="83%" overflowY="scroll">
          {mode === 'rumor' && <RumorList rumors={rumors} />}
          {mode === 'item' && <ItemList items={items} />}
        </PixelFlame>

        <HStack h="8%">
          <BaseButton
            fontSize="xl"
            selected={mode === 'rumor'}
            onClick={() => onClickModeTab('rumor')}
          >
            うわさ
          </BaseButton>
          <BaseButton
            fontSize="xl"
            selected={mode === 'item'}
            onClick={() => onClickModeTab('item')}
          >
            アイテム
          </BaseButton>
        </HStack>
      </VStack>
      <RumorImportModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
