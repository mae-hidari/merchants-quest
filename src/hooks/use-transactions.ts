import { useCallback } from 'react';

import { ItemData, RumorData } from '@/data';
import { useUserData } from '@/hooks/use-user-data';
import { ItemType, RumorType, ScanProtocolType, UserType } from '@/types';

export const useTransactions = () => {
  const { setUser, user } = useUserData();

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
        setUser({
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

  const addItem = useCallback(
    (
      data: ScanProtocolType,
      callback: {
        failed: (reason: string) => void;
        success: (item: ItemType) => void;
      },
    ) => {
      console.info('🚀 ~ data', data);
      if (!data.code) {
        callback.failed('code nothing');
        return;
      }

      const target = ItemData.find((v) => v.code === data.code);

      if (user && target) {
        // すでに所持しているアイテムは受けとらない。
        if (user.itemIds.includes(target.id)) {
          callback.failed('already have');
          return;
        }

        setUser({
          ...user,
          itemIds: Array.from(new Set([...user.itemIds, target.id])),
        } as UserType);
        callback.success(target);
        return;
      } else {
        callback.failed('not found');
      }
    },
    [user],
  );

  const removeItem = useCallback(
    (
      item: ItemType,
      callback: { failed: VoidFunction; success: VoidFunction },
    ) => {
      if (user) {
        setUser({
          ...user,
          itemIds: user.itemIds.filter((id) => id !== item.id),
        } as UserType);
        callback.success();
        return;
      } else {
        callback.failed();
      }
    },
    [user],
  );

  return { addItem, addRumor, removeItem };
};
