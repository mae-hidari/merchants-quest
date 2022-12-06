import { Button, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';

export type BaseButtonPropsType = ButtonProps & { selected?: boolean };

export const BaseButton: FC<BaseButtonPropsType> = ({
  children,
  selected,
  ...restProps
}) => {
  return (
    <Button
      {...(selected
        ? {
            _focus: { background: 'white' },
            bgColor: 'white',
            color: 'black',
          }
        : {
            _focus: { background: 'black' },
            bgColor: 'black',
            borderColor: 'white',
          })}
      border="2px"
      h="full"
      lineHeight="0"
      rounded="sm"
      w="full"
      {...restProps}
    >
      {children}
    </Button>
  );
};
