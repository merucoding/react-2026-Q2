import type { ComponentProps } from 'react';

const Checkbox = ({ ...props }: ComponentProps<'input'>) => {
  return <input {...props} type="checkbox" />;
};

export default Checkbox;
