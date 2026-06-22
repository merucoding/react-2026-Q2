import { useTranslations } from 'next-intl';
import NavButton from '@/components/NavButton/NavButton';
import { ROUTES } from '@/shared/constants/routes';
import { CENTERED_PAGE } from '@/shared/constants/styles';

const About = () => {
  const t = useTranslations('AboutPage');

  return (
    <div className={CENTERED_PAGE}>
      <h2 className="font-lexend-exa text-fuchsia-400 font-bold text-2xl dark:text-emerald-500">
        {t('intro')}
      </h2>
      <p className="mt-2">{t('description')}</p>
      <p>
        {t('project')}
        <a
          href="https://rs.school/courses/reactjs"
          className="text-fuchsia-400 font-bold text-lg dark:text-emerald-500"
        >
          RS School React course.
        </a>
      </p>
      <NavButton href={ROUTES.HOME} className="mt-4">
        {t('goHome')}
      </NavButton>
    </div>
  );
};

export default About;
