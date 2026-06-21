import NavButton from '../../components/NavButton/NavButton';
import { ROUTES } from '../../shared/constants/routes';
import { CENTERED_PAGE } from '../../shared/constants/styles';

const About = () => {
  return (
    <div className={CENTERED_PAGE}>
      <h2 className="font-lexend-exa text-fuchsia-400 font-bold text-2xl dark:text-emerald-500">
        Hello! I`m Méru.
      </h2>
      <p className="mt-2">
        I love coffee, movies, the sea, mountains, clean working code, and
        turning my dreams into reality. I completed both the preparatory and
        main courses at RS School. I keep learning, improving my skills, and
        staying persistent on my journey to becoming a Software engineer.
      </p>
      <p>
        And the Pokémon Search was developed as part of the{' '}
        <a
          href="https://rs.school/courses/reactjs"
          className="text-fuchsia-400 font-bold text-lg dark:text-emerald-500"
        >
          RS School React course.
        </a>
      </p>
      <NavButton href={ROUTES.HOME} className="mt-4">
        Go home
      </NavButton>
    </div>
  );
};

export default About;
