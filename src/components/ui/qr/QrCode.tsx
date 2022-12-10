import { useQRCode } from 'next-qrcode';
import { FC, useMemo } from 'react';

import { createProtocol, ScanProtocolType } from '@/types';

export type QrCodePropsType = {
  data: ScanProtocolType;
};

export const QrCode: FC<QrCodePropsType> = ({ data }) => {
  const { Canvas } = useQRCode();

  const protocol = useMemo(() => createProtocol(data), [data]);

  return (
    <Canvas
      options={{
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
        level: 'L',
        margin: 2,
        scale: 1,
        width: 150,
      }}
      text={protocol}
    />
  );
};
