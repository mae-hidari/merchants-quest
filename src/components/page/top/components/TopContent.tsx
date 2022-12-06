import { BoxProps, HStack, StackProps, VStack } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';

import { RumorList } from '@/components/model/rumor/RumorList/RumorList';
import { BaseButton, PixelFlame } from '@/components/ui';

type TopPageModeType = 'rumor' | 'item';

export type TopContentPropsType = StackProps;

export const TopContent: FC<BoxProps> = ({ ...restProps }) => {
  const [mode, setMode] = useState<TopPageModeType>('rumor');

  const onClickModeTab = useCallback(
    (currentMode: TopPageModeType) => {
      if (currentMode === mode) return;
      setMode((current) => (current === 'item' ? 'rumor' : 'item'));
    },
    [mode],
  );

  return (
    <VStack align="stretch" mt="5px" spacing="5px" {...restProps}>
      <HStack h="9%">
        <PixelFlame alignItems="center" display="flex" fontSize="lg" pl="1rem">
          ああああ
        </PixelFlame>
        {mode === 'rumor' && (
          <PixelFlame
            alignItems="center"
            display="flex"
            fontSize="lg"
            pl="1rem"
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
        {mode === 'rumor' && <RumorList />}
        {mode === 'item' && <RumorList />}
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
  );
};
