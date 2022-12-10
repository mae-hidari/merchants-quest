import type { ImageProps } from 'next/image';
import Image from 'next/image';
import type { FC } from 'react';

type BaseImagePropsType = { alt: string } & ImageProps;

export const BaseImage: FC<BaseImagePropsType> = ({ alt, ...props }) => (
  <Image alt={alt} {...props} />
);
