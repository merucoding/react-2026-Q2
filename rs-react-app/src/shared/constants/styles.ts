export const BORDER_STYLE =
  'px-2 py-2 border-1 border-solid border-fuchsia-300 rounded-xl cursor-pointer dark:border-fuchsia-400';

export const CENTERED_PAGE =
  'px-[15%] flex flex-col justify-center items-center gap-y-6';

export const CARD_STYLE = {
  container: `${BORDER_STYLE} relative p-2 flex flex-col items-center gap-y-2 aspect-square text-sm [&_p]:text-fuchsia-400 [&_ul]:text-sm [&_ul]:list-disc dark:[&_p]:text-emerald-500`,
  imageContainer:
    'border-b border-fuchsia-300 w-full text-center dark:border-fuchsia-400',
  image: 'max-h-full rounded-xl inline-block',
  title: 'text-fuchsia-400 font-bold text-lg dark:text-emerald-500',
};
