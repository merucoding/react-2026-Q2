import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import App from './components/App/App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/pokemons/:page" element={<App />} />
        <Route path="*" element={<Navigate to="/pokemons/1" replace />} />
      </Routes>
    </Router>
  </StrictMode>
);
