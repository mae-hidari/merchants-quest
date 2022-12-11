import { atom } from 'recoil';

import { UserType } from '@/types';

export const userState = atom<UserType | null>({
  default: null,
  key: 'userState',
});
