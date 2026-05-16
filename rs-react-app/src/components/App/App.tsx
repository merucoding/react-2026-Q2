import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage';
import About from '../../pages/About/About';
import NotFound from '../../pages/NotFound/NotFound';
import Layout from '../../layouts/Layout';
import { ROUTES } from '../../shared/constants/routes';
// import CardDetails from '../CardDetails/CardDetails';

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />

          <Route path="/pokemons/:page" element={<HomePage />}>
            {/* <Route path=":detailsId" element={<CardDetails />} /> */}
          </Route>
        </Route>

        <Route path="/about" element={<About />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
