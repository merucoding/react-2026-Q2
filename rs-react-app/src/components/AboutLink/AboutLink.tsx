import { Link } from 'react-router-dom';
import { BORDER_STYLE } from '../../shared/constants/styles';
import { cn } from '../../utils/ui';

const AboutLink = () => {
  return (
    <Link
      to="/about"
      className={cn(BORDER_STYLE, 'hover:bg-fuchsia-300 hover:text-white')}
    >
      About
    </Link>
  );
};

export default AboutLink;
