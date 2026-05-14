import {
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightFromLine,
} from 'lucide-react';

const PaginatioControls = () => {
  return (
    <nav>
      <ul>
        <li>
          <a href="#">
            <ArrowLeftToLine />
          </a>
        </li>
        <li>
          <a href="#">
            <ArrowLeft />
          </a>
        </li>
        <li>
          <span>1</span>
        </li>
        <li>
          <a href="#">
            <ArrowRight />
          </a>
        </li>
        <li>
          <a href="#">
            <ArrowRightFromLine />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PaginatioControls;
