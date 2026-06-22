'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import ErrorBoundary from './ErrorBoundary';

type Props = {
  children: ReactNode;
};

const TranslatedErrorBoundary = ({ children }: Props) => {
  const t = useTranslations('ErrorBoundary');

  return (
    <ErrorBoundary title={t('title')} buttonText={t('goBack')}>
      {children}
    </ErrorBoundary>
  );
};

export default TranslatedErrorBoundary;
