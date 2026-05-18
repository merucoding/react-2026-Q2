import type { ComponentProps } from 'react';
import { cn } from '../../utils/ui';
import { BORDER_STYLE } from '../../shared/constants/styles';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightFromLine,
} from 'lucide-react';

const classNamesActive = 'cursor-pointer';
const classNamesDisabled = 'pointer-events-none opacity-50';

const paginationIcons = {
  start: <ArrowLeftToLine />,
  previous: <ArrowLeft />,
  next: <ArrowRight />,
  end: <ArrowRightFromLine />,
};

type PaginationIcons = keyof typeof paginationIcons;

export const Pagination = ({ className, ...props }: ComponentProps<'nav'>) => {
  return (
    <nav
      className={cn('mx-auto flex w-full justify-center my-4', className)}
      {...props}
    />
  );
};

export const PaginationContent = ({
  className,
  ...props
}: ComponentProps<'ul'>) => {
  return (
    <ul
      {...props}
      className={cn('flex flex-row items-center gap-4', className)}
    />
  );
};

export const PaginationItem = ({
  className,
  ...props
}: ComponentProps<'li'>) => {
  return <li {...props} className={cn(className)} />;
};

export const PaginationLink = ({
  className,
  disabled,
  icon,
  ...props
}: ComponentProps<typeof Link> & {
  disabled: boolean;
  icon: PaginationIcons;
}) => {
  return (
    <Link
      {...props}
      className={cn(
        BORDER_STYLE,
        'block hover:bg-fuchsia-300 hover:text-white',
        disabled ? classNamesDisabled : classNamesActive,
        className
      )}
    >
      {paginationIcons[icon]}
    </Link>
  );
};
