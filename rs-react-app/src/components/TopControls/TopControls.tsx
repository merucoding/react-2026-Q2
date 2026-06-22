'use client';

import { useEffect, useState, type ChangeEvent } from 'react';
import { Eraser, Search } from 'lucide-react';
import ErrorButton from '../ErrorButton/ErrorButton';
import { BORDER_STYLE } from '@/shared/constants/styles';
import Button from '../Button/Button';
import { useSearchParams } from 'next/navigation';
import NavButton from '../NavButton/NavButton';
import { ROUTES } from '@/shared/constants/routes';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { RefreshButton } from '../RefreshButton/RefreshButton';
import { searchPokemon } from '@/app/[locale]/pokemons/[page]/actions';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import { useTranslations } from 'next-intl';

const TopControls = () => {
  const t = useTranslations('TopControls');
  const searchParams = useSearchParams();

  const searchQuery = searchParams?.get('search') ?? '';

  const [input, setInput] = useState(searchQuery);

  useEffect(() => {
    setInput(searchQuery);
  }, [searchQuery]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleClear = () => {
    setInput('');
  };

  return (
    <div className="flex justify-center gap-4 mt-8 flex-wrap">
      <form action={searchPokemon} className="flex gap-4">
        <input
          name="search"
          type="text"
          value={input}
          onChange={handleChange}
          className={BORDER_STYLE}
        />
        <Button
          data-testid="eraser-button"
          type="button"
          onClick={handleClear}
          aria-label={t('clear')}
        >
          <Eraser />
        </Button>
        <Button
          data-testid="search-button"
          type="submit"
          aria-label={t('search')}
        >
          <Search />
        </Button>
      </form>
      <ErrorButton />
      <NavButton href={ROUTES.ABOUT}>{t('about')}</NavButton>
      <ThemeSwitcher />
      <RefreshButton />
      <LanguageSwitcher />
    </div>
  );
};

export default TopControls;
