import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h2 className="font-lexend-exa text-fuchsia-400 font-bold text-2xl">
        Page not found...
      </h2>
      <Link to="/pokemons/1">Go home</Link>
    </div>
  );
};

export default NotFound;
