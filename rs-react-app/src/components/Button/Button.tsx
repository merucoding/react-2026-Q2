import type { ComponentProps } from 'react';
import { BORDER_STYLE } from '../../shared/constants/styles';
import { cn } from '../../utils/ui';

const Button = ({ className, ...props }: ComponentProps<'button'>) => {
  return (
    <button
      {...props}
      className={cn(
        BORDER_STYLE,
        'hover:bg-fuchsia-300 hover:text-white dark:hover:bg-emerald-700',
        className
      )}
    />
  );
};

export default Button;
