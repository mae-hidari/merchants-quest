import { Button, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

export type BaseButtonPropsType = ButtonProps & {
  selectable?: boolean;
  selected?: boolean;
};

export const BaseButton: FC<BaseButtonPropsType> = ({
  children,
  selectable,
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
      {...(!selectable && {
        _active: { bg: 'none' },
        _focus: { bg: 'none' },
        _hover: { bg: 'none' },
      })}
      border="2px"
      h="full"
      lineHeight="0"
      rounded="sm"
      spinner={<BeatLoader color="white" size={8} />}
      w="full"
      {...restProps}
    >
      {children}
    </Button>
  );
};
