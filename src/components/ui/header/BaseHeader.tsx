import { QuestionOutlineIcon } from '@chakra-ui/icons';
import { Box, BoxProps, chakra, Spacer, useDisclosure } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';

import { InfoModal } from '@/components/model';
import { DebugModalModal } from '@/components/model/debug';
import { PixelFlame } from '@/components/ui/flame';

type BaseHeaderPropsType = BoxProps;

export const BaseHeader: FC<BaseHeaderPropsType> = ({ ...boxProps }) => {
  const [count, setCount] = useState(0);

  const {
    isOpen: isOpenDebug,
    onClose: onCloseDebug,
    onOpen: onOpenDebug,
  } = useDisclosure();

  const {
    isOpen: isOpenInfo,
    onClose: onCloseInfo,
    onOpen: onOpenInfo,
  } = useDisclosure();

  useEffect(() => {
    if (count === 5) {
      onOpenDebug();
    }
  }, [count]);

  const _onCLoseDebug = () => {
    setCount(0);
    onCloseDebug();
  };

  const onClickTitle = useCallback(() => {
    setCount((current) => ++current);
  }, [count]);

  return (
    <>
      <PixelFlame
        alignItems="center"
        display="flex"
        justifyContent="center"
        w="100%"
        {...boxProps}
      >
        <Spacer />
        <chakra.span fontSize="2xl" fontWeight="bold" pl="1.7rem">
          <span onClick={() => setCount(0)}>Merchants</span>
          <span onClick={onClickTitle}>Quest</span>
        </chakra.span>
        <Spacer />
        <Box pr="0.5rem">
          <QuestionOutlineIcon h="1.2rem" w="1.2rem" onClick={onOpenInfo} />
        </Box>
      </PixelFlame>
      <DebugModalModal isOpen={isOpenDebug} onClose={_onCLoseDebug} />
      <InfoModal isOpen={isOpenInfo} onClose={onCloseInfo} />
    </>
  );
};
