'use client';

import { useRouter } from 'next/navigation';
import Button from '../Button/Button';

export const RefreshButton = () => {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  return <Button onClick={handleRefresh}>refresh</Button>;
};
