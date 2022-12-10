import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import { RumorData } from '@/data';
import { RumorType, ScanProtocolType, UserType } from '@/types';

export const useUserData = () => {
  const [cookies, setCookie] = useCookies(['user-data']);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (!cookies['user-data']) return;
    setUser(cookies['user-data']);
  }, [cookies]);

  const addRumor = useCallback(
    (
      data: ScanProtocolType,
      callback: { failed: VoidFunction; success: (rumor: RumorType) => void },
    ) => {
      console.info('🚀 ~ data', data);
      if (!data.code) {
        callback.failed();
        return;
      }

      const target = RumorData.find((v) => v.code === data.code);

      if (user && target) {
        console.log('🚀 ~ target', target);
        setCookie('user-data', {
          ...user,
          rumorIds: Array.from(new Set([...user.rumorIds, target.id])),
        } as UserType);
        callback.success(target);
        return;
      } else {
        callback.failed();
      }
    },
    [user],
  );

  return { addRumor, user };
};

export type UserDataHookType = ReturnType<typeof useUserData>;
