import { Component } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

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
