export const ROUTES = {
  HOME: '/pokemons/1',
  ABOUT: '/about',
  NOT_FOUND: '/*',
  TO_PAGE: (page: number) => `/pokemons/${page}`,
  TO_DETAILED_VIEW: (page: number, detailsId: string) =>
    `/pokemons/${page}/${detailsId}`,
};
