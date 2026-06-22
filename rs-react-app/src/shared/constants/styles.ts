export const BORDER_STYLE =
  'px-2 py-2 border-1 border-solid border-fuchsia-300 rounded-xl cursor-pointer dark:border-fuchsia-400';

export const CENTERED_PAGE =
  'px-[15%] flex flex-col justify-center items-center gap-y-6 min-h-[inherit] px-8';

export const CARD_STYLE = {
  container: `${BORDER_STYLE} relative p-2 flex flex-col items-center gap-y-2 aspect-square text-sm [&_p]:text-fuchsia-400 [&_ul]:text-sm [&_p]:mb-2 dark:[&_p]:text-emerald-500`,
  imageContainer:
    'border-b border-fuchsia-300 w-full text-center dark:border-fuchsia-400',
  image: 'rounded-xl inline-block',
  title: 'text-fuchsia-400 font-bold text-lg dark:text-emerald-500',
};

export const CARD_LIST_STYLE = `mt-6 flex gap-4 flex-wrap justify-center [&_li]:min-w-50 [&_li]:min-h-50 [&_li]:flex [&_li]:items-center [&_li]:justify-center`;

export const BODY_STYLE =
  'dark:bg-linear-to-br dark:from-purple-950 dark:via-fuchsia-900 dark:to-pink-700';

export const APP_STYLE = 'text-emerald-500 dark:text-fuchsia-200';
