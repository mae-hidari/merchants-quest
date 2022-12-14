import { Box, BoxProps } from '@chakra-ui/react';
import { FC, ReactElement, useEffect, useState } from 'react';

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
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    const { innerHeight } = window;

    setWindowHeight(innerHeight - 12);
  }, []);

  return (
    <Box h={windowHeight} m="5px 4px 8px 4px" {...boxProps}>
      {header && header}
      {children}
      {footer && footer}
    </Box>
  );
};
