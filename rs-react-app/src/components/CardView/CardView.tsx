import { CARD_STYLE } from '@/shared/constants/styles';
import type { ReactNode } from 'react';
import { cn } from '@/utils/ui';
import type { DetailsType } from '../DetailsList/DetailsList';
import DetailsList from '../DetailsList/DetailsList';
import Image from 'next/image';

type Props = {
  title: string;
  src: string;
  description: string;
  details?: DetailsType;
  children?: ReactNode;
};

const CardView = ({ title, src, description, details, children }: Props) => {
  const imageSize = details ? 200 : 100;

  return (
    <div className={cn(CARD_STYLE.container, details ? 'w-full mt-6' : 'w-50')}>
      {children}
      <div className={cn(CARD_STYLE.imageContainer, details ? '' : 'h-25')}>
        <Image
          src={src || '/balls.jpg'}
          className={cn(CARD_STYLE.image, details ? 'w-50 h-50' : '')}
          alt={`${title} avatar`}
          width={imageSize}
          height={imageSize}
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
