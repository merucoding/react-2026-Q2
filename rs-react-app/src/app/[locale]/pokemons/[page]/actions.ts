'use server';

import { getLocale } from 'next-intl/server';

import { redirect } from '../../../../i18n/navigation';
import { ROUTES } from '../../../../shared/constants/routes';

export const searchPokemon = async (formData: FormData) => {
  const locale = await getLocale();

  const searchQuery = String(formData.get('search') ?? '')
    .trim()
    .toLowerCase();

  if (!searchQuery) {
    redirect({
      href: ROUTES.TO_PAGE(1),
      locale,
    });
  }

  redirect({
    href: `${ROUTES.TO_PAGE(1)}?search=${encodeURIComponent(searchQuery)}`,
    locale,
  });
};
