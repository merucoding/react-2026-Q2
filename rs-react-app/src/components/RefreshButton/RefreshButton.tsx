'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '../../i18n/navigation';
import Button from '../Button/Button';

export const RefreshButton = () => {
  const t = useTranslations('RefreshButton');
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  return <Button onClick={handleRefresh}>{t('refresh')}</Button>;
};
