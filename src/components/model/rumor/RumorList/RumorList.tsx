import { StackProps, useDisclosure, VStack } from '@chakra-ui/react';
import { FC, useCallback, useState } from 'react';

import { RumorModal } from '@/components/model/rumor/RumorModal';
import { BaseImage, ListItem } from '@/components/ui';
import { RumorType } from '@/types';

export type RumorListPropsType = StackProps & {
  rumors: RumorType[];
};

export const RumorList: FC<RumorListPropsType> = ({
  rumors,
  ...stackProps
}) => {
  const [currentRumor, setCurrentRumor] = useState<RumorType | null>();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const onClickRumor = useCallback((rumor: RumorType) => {
    setCurrentRumor(rumor);
    onOpen();
  }, []);

  return (
    <>
      <VStack pb="1rem" pt="2rem" px="1rem" spacing="2rem" {...stackProps}>
        {rumors.map((rumor) => (
          <ListItem
            flexProps={{
              fontSize: 'xl',
              gap: '0.3rem',
            }}
            key={rumor.code}
            title={`うわさ${rumor.id}`}
            onClick={() => onClickRumor(rumor)}
          >
            <BaseImage
              alt={'吹き出し'}
              height="24px"
              src={'/image/bubble.png'}
              width="20px"
            />
            {rumor.title}
          </ListItem>
        ))}
      </VStack>
      {currentRumor && (
        <RumorModal isOpen={isOpen} rumor={currentRumor} onClose={onClose} />
      )}
    </>
  );
};
