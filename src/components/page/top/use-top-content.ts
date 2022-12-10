import { useMemo } from 'react';

import { ItemData, RumorData } from '@/data';
import { useUserData } from '@/hooks';

export const useTopContent = () => {
  const { user } = useUserData();

  const rumors = useMemo(() => {
    return RumorData.filter((data) => user?.rumorIds.includes(data.id));
  }, [user]);

  const items = useMemo(() => {
    return ItemData.filter((data) => user?.itemIds.includes(data.id));
  }, [user]);

  return { items, rumors, user };
};

export type TopContentHookType = ReturnType<typeof useTopContent>;
