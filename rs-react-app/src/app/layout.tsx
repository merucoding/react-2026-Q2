import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import { APP_STYLE, BODY_STYLE } from '../shared/constants/styles';
import Providers from './providers';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

import '../styles/style.css';

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
          <Providers>
            <ErrorBoundary>{children}</ErrorBoundary>
          </Providers>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
