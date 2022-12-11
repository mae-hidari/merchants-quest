import {
  Box,
  BoxProps,
  Flex,
  HStack,
  StackProps,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';

import { RumorImportModal } from '@/components/model';
import {
  ItemAmount,
  ItemCanNotImportModal,
  ItemImportModal,
  ItemList,
} from '@/components/model/item';
import { RumorList } from '@/components/model/rumor/RumorList/RumorList';
import { useTopContent } from '@/components/page/top/use-top-content';
import { BaseButton, PixelFlame } from '@/components/ui';

type TopPageModeType = 'rumor' | 'item';

export type TopContentPropsType = StackProps;

export const TopContent: FC<BoxProps> = ({ ...restProps }) => {
  const { items, rumors, user } = useTopContent();

  const {
    isOpen: isOpenRumor,
    onClose: onCloseRumor,
    onOpen: onOpenRumor,
  } = useDisclosure();

  const {
    isOpen: isOpenItem,
    onClose: onCloseItem,
    onOpen: onOpenItem,
  } = useDisclosure();

  const {
    isOpen: isOpenExcessItem,
    onClose: onCloseExcessItem,
    onOpen: onOpenExcessItem,
  } = useDisclosure();

  const [mode, setMode] = useState<TopPageModeType>('rumor');

  const onClickModeTab = useCallback(
    (currentMode: TopPageModeType) => {
      if (currentMode === mode) return;
      setMode((current) => (current === 'item' ? 'rumor' : 'item'));
    },
    [mode],
  );

  const onClickImportItem = useCallback(() => {
    if (!user) return;
    user.itemIds.length > 4 ? onOpenExcessItem() : onOpenItem();
  }, [user]);

  return (
    <>
      <VStack align="stretch" mt="5px" spacing="5px" {...restProps}>
        <HStack h="9%">
          <PixelFlame alignItems="center" display="flex" fontSize="lg" p="1rem">
            <Flex justifyContent="space-between" w="full">
              {user && (
                <>
                  <Box>{user.name}</Box>
                  <ItemAmount user={user} />
                </>
              )}
            </Flex>
          </PixelFlame>
          {mode === 'rumor' && (
            <PixelFlame
              alignItems="center"
              display="flex"
              fontSize="lg"
              pl="1rem"
              onClick={onOpenRumor}
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
              onClick={onClickImportItem}
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
            selectable
            fontSize="xl"
            selected={mode === 'rumor'}
            onClick={() => onClickModeTab('rumor')}
          >
            うわさ
          </BaseButton>
          <BaseButton
            selectable
            fontSize="xl"
            selected={mode === 'item'}
            onClick={() => onClickModeTab('item')}
          >
            アイテム
          </BaseButton>
        </HStack>
      </VStack>
      <RumorImportModal isOpen={isOpenRumor} onClose={onCloseRumor} />
      <ItemImportModal isOpen={isOpenItem} onClose={onCloseItem} />
      <ItemCanNotImportModal
        isOpen={isOpenExcessItem}
        user={user}
        onClose={onCloseExcessItem}
      ></ItemCanNotImportModal>
    </>
  );
};
