import type { ComponentProps } from 'react';
import { cn } from '../../utils/ui';
import { Check as CheckIcon } from 'lucide-react';

const Checkbox = ({ className, ...props }: ComponentProps<'input'>) => {
  return (
    <label
      className={cn('relative flex items-center justify-center', className)}
    >
      <input
        {...props}
        type="checkbox"
        className={` 
            peer
            appearance-none
            w-7 h-7
            border border-solid border-fuchsia-300
            rounded-lg
            cursor-pointer
            hover:bg-fuchsia-300
            transition-colors
          `}
      />
      <CheckIcon
        className={`
          absolute
          w-5 h-5
          pointer-events-none
          text-emerald-500
          peer-hover:text-white
          transition-all
          scale-0
          peer-checked:scale-100
        `}
      />
    </label>
  );
};

export default Checkbox;
