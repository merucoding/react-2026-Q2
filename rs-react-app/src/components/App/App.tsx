import Header from '../Header/Header';
import Main from '../Main/Main';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <Header />
      <Main />
    </ErrorBoundary>
  );
};

export default App;
