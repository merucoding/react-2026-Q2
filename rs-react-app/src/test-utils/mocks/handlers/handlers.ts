import { pokemonByNameHandler } from './pokemonByName';
import { pokemonListHandler } from './pokemonList';

export const handlers = [pokemonListHandler(), pokemonByNameHandler()];
