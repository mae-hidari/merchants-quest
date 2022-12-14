import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRecoilState } from 'recoil';

import { userState } from '@/state';
import { UserType } from '@/types';

export const useUserData = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['user-data']);
  const [user, _setUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    if (!cookies['user-data']) return;
    _setUser(cookies['user-data']);
  }, [cookies]);

  const setUser = useCallback((user: UserType) => {
    setCookie('user-data', { ...user });
  }, []);

  const resetUser = useCallback(() => {
    removeCookie('user-data');
    router.reload();
  }, [user]);

  return { resetUser, setUser, user };
};

export type UserDataHookType = ReturnType<typeof useUserData>;
