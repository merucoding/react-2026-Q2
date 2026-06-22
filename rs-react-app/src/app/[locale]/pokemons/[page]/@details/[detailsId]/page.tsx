import CardDetails from '@/views/CardDetails/CardDetails';

type Props = {
  params: Promise<{
    page: string;
    detailsId: string;
  }>;
};

const PokemonDetails = async ({ params }: Props) => {
  const { page, detailsId } = await params;

  const currentPage = Number(page) || 1;

  return (
    <aside className="w-[25%]">
      <CardDetails pokemonName={detailsId} currentPage={currentPage} />
    </aside>
  );
};

export default PokemonDetails;
