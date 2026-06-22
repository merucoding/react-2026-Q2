'use client';

import type { ChangeEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { BORDER_STYLE } from '@/shared/constants/styles';
import { cn } from '@/utils/ui';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const t = useTranslations('LanguageSwitcher');

  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;

    router.replace(pathname, {
      locale: nextLocale,
    });
  };

  return (
    <label className={cn(BORDER_STYLE, 'flex items-center gap-2')}>
      <select
        value={locale}
        onChange={handleChange}
        className="cursor-pointer outline-none focus:outline-none"
      >
        <option value="en">{t('en')}</option>
        <option value="ru">{t('ru')}</option>
        <option value="kk">{t('kk')}</option>
      </select>
    </label>
  );
};

export default LanguageSwitcher;
