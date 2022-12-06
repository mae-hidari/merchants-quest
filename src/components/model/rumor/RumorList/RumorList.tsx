import { Flex, StackProps, useDisclosure, VStack } from '@chakra-ui/react';
import { FC } from 'react';

import { RumorModal } from '@/components/model/rumor/RumorModal';
import { BaseImage, Item } from '@/components/ui';
import { RumorData } from '@/data';

export type RumorListPropsType = StackProps;

export const RumorList: FC<RumorListPropsType> = ({ ...stackProps }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <VStack pb="1rem" pt="2rem" px="1rem" spacing="2rem" {...stackProps}>
        <Item
          content={
            <Flex alignItems="center" fontSize="xl" gap="0.2rem">
              <BaseImage
                alt={'吹き出し'}
                height="24px"
                src={'/image/bubble.png'}
                width="20px"
              />
              呪われた装備
            </Flex>
          }
          title="うわさ1"
          onClick={onOpen}
        ></Item>
      </VStack>
      <RumorModal isOpen={isOpen} rumor={RumorData[0]} onClose={onClose} />
    </>
  );
};
