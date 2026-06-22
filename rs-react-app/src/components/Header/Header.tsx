import { useTranslations } from 'next-intl';
import TopControls from '../TopControls/TopControls';

const Header = () => {
  const t = useTranslations('Header');

  return (
    <header>
      <h1 className="font-logo text-4xl bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent dark:text-fuchsia-200 mt-8">
        {t('title')}
      </h1>

      <TopControls />
    </header>
  );
};

export default Header;
