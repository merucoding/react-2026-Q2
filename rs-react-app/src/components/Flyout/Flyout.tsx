import { BORDER_STYLE } from '../../shared/constants/styles';
import Button from '../Button/Button';

type Props = {
  selectedCount: number;
  onUnselectAll: () => void;
  onDownload: () => void;
};

const Flyout = ({ selectedCount, onUnselectAll, onDownload }: Props) => {
  return (
    <div
      className={`${BORDER_STYLE} fixed bottom-1 left-1 flex items-center gap-4 justify-between bg-white`}
    >
      <h3 className="text-fuchsia-400 font-bold text-lg">
        <span>{selectedCount}</span> Pokémon selected
      </h3>
      <Button onClick={onUnselectAll}>Unselect all</Button>
      <Button onClick={onDownload}>Download</Button>
    </div>
  );
};

export default Flyout;
