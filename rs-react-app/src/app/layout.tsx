import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import '../styles/style.css';

import { APP_STYLE, BODY_STYLE } from '../shared/constants/styles';

export const metadata: Metadata = {
  title: 'PokeApi',
};

type Props = {
  children: ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={BODY_STYLE}>
        <div id="root" className={APP_STYLE}>
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
