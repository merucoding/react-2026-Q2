import { Component } from 'react';
import { Eraser, Search } from 'lucide-react';
import { BORDER_STYLE, BUTTON_HOVER_STYLE } from '../types/constants';
import { fetchPokemons } from '../api/fetchPokemons';

export default class TopControls extends Component {
  handleClick = async () => {
    const pokemon = await fetchPokemons();
    console.log(pokemon);
  };
  render() {
    return (
      <div className="flex justify-center gap-4 mt-8 flex-wrap">
        <input type="text" className={BORDER_STYLE} />
        <button className={`${BORDER_STYLE} ${BUTTON_HOVER_STYLE}`}>
          <Eraser />
        </button>
        <button
          onClick={this.handleClick}
          className={`${BORDER_STYLE} ${BUTTON_HOVER_STYLE}`}
        >
          <Search />
        </button>
      </div>
    );
  }
}
