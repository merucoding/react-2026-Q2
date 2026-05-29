import { useParams } from 'react-router-dom';
import Card from '../../components/Card/Card';

const CardDetails = () => {
  const { detailsId } = useParams();

  if (!detailsId) return null;

  return (
    <div className="sticky top-4">
      <Card pokemon={detailsId} detailed />
    </div>
  );
};

export default CardDetails;
