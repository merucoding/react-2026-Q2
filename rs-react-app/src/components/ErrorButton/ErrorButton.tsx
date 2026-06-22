'use client';

import { useState } from 'react';
import Button from '../Button/Button';
import { useTranslations } from 'next-intl';

const ErrorButton = () => {
  const t = useTranslations('ErrorButton');
  const [showError, setShowError] = useState(false);
  if (showError) throw new Error('Test Error Boundary');

  return (
    <Button data-testid="error-button" onClick={() => setShowError(true)}>
      {t('trigger')}
    </Button>
  );
};

export default ErrorButton;
