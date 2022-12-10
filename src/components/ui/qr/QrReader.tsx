import { Box } from '@chakra-ui/react';
import { FC, memo } from 'react';
import { useZxing } from 'react-zxing';

import { decodeProtocol, ScanProtocolType } from '@/types';

export type QrReaderPropsType = {
  onResult: (data: ScanProtocolType) => void;
};

export const QrReader: FC<QrReaderPropsType> = memo(({ onResult }) => {
  const { ref } = useZxing({
    onResult(result) {
      const data = decodeProtocol(result.getText());
      onResult(data);
    },
  });
  return (
    <Box px="1rem">
      <video ref={ref} />
    </Box>
  );
});

QrReader.displayName = 'QrReader';
