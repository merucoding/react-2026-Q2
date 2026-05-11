import { Component } from 'react';
import Header from '../Header';
import Main from '../Main';
import ErrorBoundary from '../ErrorBoundary';

export default class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Header />
        <Main />
      </ErrorBoundary>
    );
  }
}
