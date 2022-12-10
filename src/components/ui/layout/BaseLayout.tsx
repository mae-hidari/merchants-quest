import { Box, BoxProps } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

type BaseLayoutPropsType = {
  footer?: ReactElement;
  header?: ReactElement;
} & BoxProps;

export const BaseLayout: FC<BaseLayoutPropsType> = ({
  children,
  footer,
  header,
  ...boxProps
}) => {
  return (
    <Box h="calc(100vh - 12px)" m="5px 4px 8px 4px" {...boxProps}>
      {header && header}
      {children}
      {footer && footer}
    </Box>
  );
};
