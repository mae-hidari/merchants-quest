import { FC, useRef, useState } from 'react';

import { BaseButton, BaseButtonPropsType } from '@/components/ui';

export const useTimeLoadingButton = ({
  countDownTime = 3,
}: {
  countDownTime?: number;
}) => {
  const [isLoadingClose, setIsLoadingClose] = useState(true);
  const timeout = useRef<NodeJS.Timeout>();

  const startTimer = () => {
    const timer = setTimeout(() => {
      setIsLoadingClose(false);
    }, countDownTime * 1000);

    timeout.current = timer;
  };

  const clearTimer = () => {
    setIsLoadingClose(true);
    clearTimeout(timeout.current);
  };

  const TimeLoadingButton: FC<BaseButtonPropsType> = ({ ...props }) => {
    return <BaseButton isLoading={isLoadingClose} {...props} />;
  };

  return { TimeLoadingButton, clearTimer, startTimer };
};
