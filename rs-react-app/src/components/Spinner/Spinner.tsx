import { SPINNER_STYLE } from '../../shared/constants/styles';

const Spinner = () => {
  return (
    <div
      data-testid="spinner"
      className="flex justify-center items-center h-100"
    >
      <div className={SPINNER_STYLE}></div>
    </div>
  );
};

export default Spinner;
