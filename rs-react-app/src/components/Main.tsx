import { Component } from 'react';
import TopControls from './TopControls';
import { LOCAL_STORAGE_QUERY_KEY } from '../types/constants';
import type { Pokemon } from 'pokeapi-typescript';
import { fetchPokemons } from '../api/fetchPokemons';

type MainState = {
  loading: boolean;
  pokemons: Pokemon[];
  searchText: string;
  errorMessage: string;
};

export default class Main extends Component {
  state: MainState = {
    loading: false,
    pokemons: [],
    searchText: localStorage.getItem(LOCAL_STORAGE_QUERY_KEY) || '',
    errorMessage: '',
  };

  componentDidMount(): void {
    this.loadPokemons(this.state.searchText.trim());
  }

  async loadPokemons(searchText: string) {
    this.setState({ loading: true });
    const { pokemons, errorMessage } = await fetchPokemons(searchText);
    this.setState({ loading: false, pokemons, errorMessage });
  }

  handleSearch = () => {
    const trimmed = this.state.searchText.trim();
    localStorage.setItem(LOCAL_STORAGE_QUERY_KEY, trimmed);
    this.loadPokemons(trimmed);
  };

  handleInputChange = (searchText: string) => {
    this.setState({ searchText });
  };

  render() {
    const { loading, searchText, errorMessage } = this.state;

    return (
      <main className="font-lexend-exa text-emerald-500 font-light">
        <TopControls
          value={searchText}
          onSearch={this.handleSearch}
          onChange={this.handleInputChange}
        />
        {loading ? (
          <div>Loading...</div>
        ) : errorMessage ? (
          <div className="mt-8 text-fuchsia-400 font-bold text-lg">
            {errorMessage}
          </div>
        ) : (
          <div>Pokemon</div>
        )}
      </main>
    );
  }
}
