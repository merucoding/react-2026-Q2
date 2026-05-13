import { BORDER_STYLE } from '../../shared/constants/styles';

type Props = {
  title: string;
  src: string;
  description: string;
};

const Card = ({ title, src, description }: Props) => {
  return (
    <div
      className={`${BORDER_STYLE} p-2 flex flex-col items-center gap-y-2 aspect-square w-50`}
    >
      <div className="h-25">
        <img src={src} />
      </div>
      <h2 className="text-fuchsia-400 font-bold text-lg">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default Card;
