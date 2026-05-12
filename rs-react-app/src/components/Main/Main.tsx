import { Component } from 'react';
import TopControls from '../TopControls/TopControls';
import type { Pokemon } from 'pokeapi-typescript';
import { fetchPokemons } from '../../api/fetchPokemons';
import Loading from '../Loading/Loading';
import CardList from '../CardList/CardList';
import { LOCAL_STORAGE_QUERY_KEY } from '../../shared/constants/ls';

type MainState = {
  loading: boolean;
  pokemons: Pokemon[];
  searchText: string;
  lastSearchText: string;
  errorMessage: string;
};

export default class Main extends Component {
  state: MainState = {
    loading: false,
    pokemons: [],
    searchText: '',
    lastSearchText: '',
    errorMessage: '',
  };

  componentDidMount(): void {
    const saved = localStorage.getItem(LOCAL_STORAGE_QUERY_KEY) || '';

    this.setState({
      searchText: saved,
      lastSearchText: saved,
    });
    this.loadPokemons(saved);
  }

  async loadPokemons(searchText: string): Promise<void> {
    this.setState({ loading: true });
    const { pokemons, errorMessage } = await fetchPokemons(searchText);
    this.setState({ loading: false, pokemons, errorMessage });
  }

  handleSearch = () => {
    const trimmed = this.state.searchText.trim();
    if (trimmed !== this.state.lastSearchText) {
      localStorage.setItem(LOCAL_STORAGE_QUERY_KEY, trimmed);
      this.setState({ lastSearchText: trimmed });
      this.loadPokemons(trimmed);
    }
    this.setState({ searchText: trimmed });
  };

  handleInputChange = (searchText: string) => {
    this.setState({ searchText });
  };

  render() {
    const { loading, pokemons, searchText, errorMessage } = this.state;

    return (
      <main className="font-lexend-exa text-emerald-500 font-light">
        <TopControls
          value={searchText}
          onSearch={this.handleSearch}
          onChange={this.handleInputChange}
        />
        {loading ? (
          <Loading />
        ) : errorMessage ? (
          <div className="mt-8 text-fuchsia-400 font-bold text-lg">
            {errorMessage}
          </div>
        ) : (
          <CardList pokemons={pokemons} />
        )}
      </main>
    );
  }
}
