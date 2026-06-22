'use client';

import { useTheme } from '@/context/useTheme';
import Button from '../Button/Button';
import { MoonStar as MoonIcon, Sun as SunIcon } from 'lucide-react';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  const buttonIcon = theme === 'dark' ? <SunIcon /> : <MoonIcon />;

  return <Button onClick={toggleTheme}>{buttonIcon}</Button>;
};

export default ThemeSwitcher;
