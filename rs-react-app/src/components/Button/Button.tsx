import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { BORDER_STYLE } from '../../shared/constants/styles';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

const Button = ({ children, className = '', ...props }: Props) => {
  return (
    <button
      {...props}
      className={`${BORDER_STYLE} hover:bg-fuchsia-300 hover:text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
