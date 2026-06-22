import type { ReactNode } from 'react';
import Header from '../../../../components/Header/Header';

const Layout = ({
  children,
  details,
}: {
  children: ReactNode;
  details: ReactNode;
}) => {
  return (
    <>
      <Header />
      <main>
        <div className="flex gap-x-4">
          <section className="flex-1">{children}</section>
          {details}
        </div>
      </main>
    </>
  );
};

export default Layout;
