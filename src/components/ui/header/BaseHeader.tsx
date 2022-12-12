import { BoxProps, chakra, useDisclosure } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';

import { DebugModalModal } from '@/components/model/debug';
import { PixelFlame } from '@/components/ui/flame';

type BaseHeaderPropsType = BoxProps;

export const BaseHeader: FC<BaseHeaderPropsType> = ({ ...boxProps }) => {
  const [count, setCount] = useState(0);

  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (count === 5) {
      onOpen();
    }
  }, [count]);

  const _onCLose = () => {
    setCount(0);
    onClose();
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
        <chakra.span fontSize="2xl" fontWeight="bold">
          <span onClick={() => setCount(0)}>Merchants</span>
          <span onClick={onClickTitle}>Quest</span>
        </chakra.span>
      </PixelFlame>
      <DebugModalModal isOpen={isOpen} onClose={_onCLose} />
    </>
  );
};
