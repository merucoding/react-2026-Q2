import { Component, type ChangeEvent } from 'react';
import { Eraser, Search } from 'lucide-react';
import { BORDER_STYLE, BUTTON_HOVER_STYLE } from '../types/constants';

type SearchProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export default class TopControls extends Component<SearchProps> {
  render() {
    return (
      <div className="flex justify-center gap-4 mt-8 flex-wrap">
        <input
          type="text"
          value={this.props.value}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            this.props.onChange(event.target.value)
          }
          className={BORDER_STYLE}
        />
        <button
          onClick={() => this.props.onChange('')}
          className={`${BORDER_STYLE} ${BUTTON_HOVER_STYLE}`}
        >
          <Eraser />
        </button>
        <button
          onClick={this.props.onSearch}
          className={`${BORDER_STYLE} ${BUTTON_HOVER_STYLE}`}
        >
          <Search />
        </button>
      </div>
    );
  }
}
