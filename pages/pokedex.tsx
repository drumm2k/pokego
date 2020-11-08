import { Pdex } from 'components/Pokedex/Pokedex';
import { Title } from 'components/Title';
import getPokemons from 'graphql/queries/pokemons.graphql';
import { initializeApollo } from 'lib/apolloClient';
import { useGetPokemonsQuery } from '../graphql/graphql';

export default function Pokedex() {
  const { data, loading, error } = useGetPokemonsQuery();

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  return (
    <>
      <Title color="#bb00c8">Покедекс</Title>
      <Pdex pokemons={data?.getPokemons} />
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: getPokemons,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
}
