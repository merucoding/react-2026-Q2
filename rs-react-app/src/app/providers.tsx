'use client';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeProvider } from '../context/ThemeContext';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

export default Providers;
