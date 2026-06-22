import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import { APP_STYLE, BODY_STYLE } from '../shared/constants/styles';
import Providers from './providers';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

import '../styles/style.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'PokeApi',
};

type Props = {
  children: ReactNode;
};

const RootLayout = async ({ children }: Props) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={BODY_STYLE}>
        <div id="root" className={APP_STYLE}>
          <NextIntlClientProvider messages={messages}>
            <Providers>
              <ErrorBoundary>{children}</ErrorBoundary>
            </Providers>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
