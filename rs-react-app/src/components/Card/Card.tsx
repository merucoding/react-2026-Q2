import type { Pokemon } from 'pokeapi-typescript';
import { Component } from 'react';
import getPokemonParams from '../../utils/getPokemonParams';

type CardProps = {
  pokemon: Pokemon;
};

export default class Card extends Component<CardProps> {
  render() {
    const { pokemon } = this.props;

    return (
      <div className="p-2 flex flex-col items-center gap-y-2 aspect-square w-[200px] border-1 border-solid border-fuchsia-300 rounded-xl">
        <div className="h-[100px]">
          <img src={pokemon.sprites.front_default} />
        </div>
        <h2 className="text-fuchsia-400 font-bold text-lg">{pokemon.name}</h2>
        <p className="text-sm">
          {getPokemonParams(pokemon.height, pokemon.weight)}
        </p>
      </div>
    );
  }
}
