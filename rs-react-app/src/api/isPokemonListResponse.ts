type PokemonListResponse = {
  count: number;
  results: { url: string }[];
};

export function isPokemonListResponse(
  data: unknown
): data is PokemonListResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'results' in data &&
    Array.isArray(data.results) &&
    'count' in data
  );
}
