export const MOCK_PIKACHU_DATA = {
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprites: {
    front_default:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
  },
  cries: {
    latest: 'cry-url',
  },
  abilities: [
    {
      ability: {
        name: 'static',
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: 'electric',
      },
    },
  ],
  moves: [
    {
      move: {
        name: 'mega-punch',
      },
    },
  ],
};

export const MOCK_POKEMONS_DATA = [
  {
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    sprites: {
      front_default:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
    },
  },
  {
    name: 'ivysaur',
    height: 10,
    weight: 130,
    sprites: {
      front_default:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==',
    },
  },
];

export const MOCK_POKEMONS_LIST_RESPONSE = {
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ],
  count: 1350,
};

export const MOCK_INVALID_RESPONSE = {
  results: [{ firstName: 'Anna', lastName: 'K.' }],
};
