import Button from '../Button/Button';

export type DetailsType = {
  cries: string;
  detailsList: { title: string; items: string[] }[];
};

type Props = {
  details: DetailsType;
};

const playCry = (url: string) => {
  const audio = new Audio(url);
  audio.play();
};

const DetailsList = ({ details }: Props) => {
  const { cries, detailsList } = details;
  return (
    <>
      {cries && (
        <Button onClick={() => playCry(cries)}>hear the Pokémon</Button>
      )}
      {detailsList.map(({ title, items }) => {
        console.log(title, items);
        return items.length > 0 ? (
          <div key={title}>
            <p>{title}:</p>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null;
      })}
    </>
  );
};

export default DetailsList;
