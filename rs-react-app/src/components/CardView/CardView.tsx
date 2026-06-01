import { CARD_STYLE } from '../../shared/constants/styles';
import DEFAULT_IMAGE from '../../assets/balls.jpg';
import type { ReactNode } from 'react';
import { cn } from '../../utils/ui';
import type { DetailsType } from '../DetailsList/DetailsList';
import DetailsList from '../DetailsList/DetailsList';

type Props = {
  title: string;
  src: string;
  description: string;
  details?: DetailsType;
  children?: ReactNode;
  onClick?: () => void;
};

const CardView = ({
  title,
  src,
  description,
  details,
  children,
  onClick,
}: Props) => {
  return (
    <div
      className={cn(CARD_STYLE.container, details ? 'w-full mt-6' : 'w-50')}
      onClick={onClick}
    >
      {children}
      <div className={cn(CARD_STYLE.imageContainer, details ? '' : 'h-25')}>
        <img
          className={cn(CARD_STYLE.image, details ? 'w-50 h-50' : '')}
          src={src || DEFAULT_IMAGE}
        />
      </div>
      <h2 className={cn(CARD_STYLE.title, details ? '' : 'line-clamp-1')}>
        {title}
      </h2>
      <h3>{description}</h3>
      {details && <DetailsList details={details} />}
    </div>
  );
};

export default CardView;
