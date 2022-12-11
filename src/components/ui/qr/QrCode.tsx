import { useQRCode } from 'next-qrcode';
import { FC, useMemo } from 'react';

import { useUserData } from '@/hooks';
import { createProtocol, ScanProtocolType } from '@/types';

export type QrCodePropsType = {
  code: ScanProtocolType['code'];
};

export const QrCode: FC<QrCodePropsType> = ({ code }) => {
  const { Canvas } = useQRCode();
  const { user } = useUserData();

  const protocol = useMemo(
    () => createProtocol({ code, name: user?.name || '' }),
    [code, user],
  );

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
