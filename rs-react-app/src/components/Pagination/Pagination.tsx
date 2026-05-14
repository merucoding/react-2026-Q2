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
  ...props
}: ComponentProps<typeof Link>) => {
  return (
    <Link
      {...props}
      className={cn(
        BORDER_STYLE,
        'block hover:bg-fuchsia-300 hover:text-white',
        className
      )}
    />
  );
};

export const PaginationStart = ({
  ...props
}: ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink {...props}>
      <ArrowLeftToLine />
    </PaginationLink>
  );
};

export const PaginationPrevious = ({
  ...props
}: ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink {...props}>
      <ArrowLeft />
    </PaginationLink>
  );
};

export const PaginationNext = ({
  ...props
}: ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink {...props}>
      <ArrowRight />
    </PaginationLink>
  );
};

export const PaginationEnd = ({
  ...props
}: ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink {...props}>
      <ArrowRightFromLine />
    </PaginationLink>
  );
};
