import { Link } from 'react-router-dom';
import { BORDER_STYLE } from '../../shared/constants/styles';
import { cn } from '../../utils/ui';
import type { ComponentProps } from 'react';

const NavButton = ({
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) => {
  return (
    <Link
      {...props}
      className={cn(
        BORDER_STYLE,
        'hover:bg-fuchsia-300 hover:text-white',
        className
      )}
    >
      {children}
    </Link>
  );
};

export default NavButton;
