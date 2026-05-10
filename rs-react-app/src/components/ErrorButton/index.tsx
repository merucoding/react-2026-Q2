import { Component } from 'react';
import { BORDER_STYLE } from '../../shared/constants/style';

type ErrorButtonState = {
  showError: boolean;
};

export default class ErrorButton extends Component {
  state: ErrorButtonState = {
    showError: false,
  };

  render() {
    if (this.state.showError) throw new Error('Test Error Boundary');

    return (
      <button
        data-testid="error-button"
        onClick={() => this.setState({ showError: true })}
        className={`${BORDER_STYLE} hover:bg-fuchsia-300 hover:text-white`}
      >
        trigger error
      </button>
    );
  }
}
