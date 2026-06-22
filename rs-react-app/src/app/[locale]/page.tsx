import { redirect } from '../../i18n/navigation';
import { ROUTES } from '../../shared/constants/routes';

const Page = () => {
  redirect({
    href: ROUTES.TO_PAGE(1),
    locale: 'en',
  });
};

export default Page;
