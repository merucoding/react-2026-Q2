import { Component } from 'react';
import { Eraser, Search } from 'lucide-react';
import { BORDER_STYLE, BUTTON_HOVER_STYLE } from '../../types/constants';

export default class TopControls extends Component {
  render() {
    return (
      <div className="flex justify-center gap-4 mt-8 flex-wrap">
        <input type="text" className={BORDER_STYLE} />
        <button className={`${BORDER_STYLE} ${BUTTON_HOVER_STYLE}`}>
          <Eraser />
        </button>
        <button className={`${BORDER_STYLE} ${BUTTON_HOVER_STYLE}`}>
          <Search />
        </button>
      </div>
    );
  }
}
