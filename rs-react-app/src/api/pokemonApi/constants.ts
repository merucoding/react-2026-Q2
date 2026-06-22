export const _apiBase = 'https://pokeapi.co/api/v2/';
export const _baseOffset = 0;
export const _limitPerPage = 20;
export const _cacheTtl =
  Number(process.env.NEXT_PUBLIC_POKEMON_API_CACHE_TTL) || 60;
