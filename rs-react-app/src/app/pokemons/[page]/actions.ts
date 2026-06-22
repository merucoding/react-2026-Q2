'use server';

import { redirect } from 'next/navigation';

import { ROUTES } from '../../../shared/constants/routes';

export const searchPokemon = async (formData: FormData) => {
  const searchQuery = String(formData.get('search') ?? '')
    .trim()
    .toLowerCase();

  if (!searchQuery) {
    redirect(ROUTES.TO_PAGE(1));
  }

  redirect(`${ROUTES.TO_PAGE(1)}?search=${encodeURIComponent(searchQuery)}`);
};
