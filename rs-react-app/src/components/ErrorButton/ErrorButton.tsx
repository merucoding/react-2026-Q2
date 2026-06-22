'use client';

import { useState } from 'react';
import Button from '../Button/Button';

const ErrorButton = () => {
  const [showError, setShowError] = useState(false);
  if (showError) throw new Error('Test Error Boundary');

  return (
    <Button data-testid="error-button" onClick={() => setShowError(true)}>
      trigger error
    </Button>
  );
};

export default ErrorButton;
