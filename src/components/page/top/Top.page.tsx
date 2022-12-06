import { NextPage } from 'next';
import { memo } from 'react';

import { TopContent } from '@/components/page/top/components/TopContent';
import { BaseHeader, BaseLayout } from '@/components/ui';

const TopPage: NextPage = memo(() => {
  return (
    <BaseLayout header={<BaseHeader h="8%" />}>
      <TopContent h="92%" />
    </BaseLayout>
  );
});

TopPage.displayName = 'TopPage';

export default TopPage;
