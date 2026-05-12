import { useState } from 'react';
import { BORDER_STYLE } from '../../shared/constants/styles';

const ErrorButton = () => {
  const [showError, setShowError] = useState(false);
  if (showError) throw new Error('Test Error Boundary');

  return (
    <button
      data-testid="error-button"
      onClick={() => setShowError(true)}
      className={`${BORDER_STYLE} hover:bg-fuchsia-300 hover:text-white`}
    >
      trigger error
    </button>
  );
};

export default ErrorButton;
