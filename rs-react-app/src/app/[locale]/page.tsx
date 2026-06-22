import { redirect } from '@/i18n/navigation';
import { ROUTES } from '@/shared/constants/routes';

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { locale } = await params;

  redirect({
    href: ROUTES.TO_PAGE(1),
    locale,
  });
};

export default Page;
