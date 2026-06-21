import NavButton from '../../components/NavButton/NavButton';
import { ROUTES } from '../../shared/constants/routes';
import { CENTERED_PAGE } from '../../shared/constants/styles';

const NotFound = () => {
  return (
    <div className={CENTERED_PAGE}>
      <h2 className="font-lexend-exa text-fuchsia-400 font-bold text-2xl">
        Page not found...
      </h2>
      <NavButton href={ROUTES.HOME} className="mt-4">
        Go home
      </NavButton>
    </div>
  );
};

export default NotFound;
