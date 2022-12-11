import { TriangleUpIcon } from '@chakra-ui/icons';
import { Button, ButtonProps, Spacer } from '@chakra-ui/react';
import { FC } from 'react';

export type SelectButtonPropsType = ButtonProps & { selected?: boolean };

export const SelectButton: FC<SelectButtonPropsType> = ({
  children,
  selected,
  ...props
}) => {
  return (
    <Button
      _active={{ bg: 'none' }}
      _focus={{ bg: 'none' }}
      _hover={{ bg: 'none' }}
      p="0"
      variant="ghost"
      {...props}
    >
      {selected ? (
        <TriangleUpIcon transform={'rotate(90deg)'} />
      ) : (
        <Spacer w="1.2rem" />
      )}
      {children}
    </Button>
  );
};
