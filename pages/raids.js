import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { initializeApollo } from '../lib/apolloClient';
import RaidTier from '../components/RaidTier';
import Title from '../components/Title';

export const GET_ALL_RAID_TIERS = gql`
  query {
    getRaidTiers {
      tier
      raids {
        pokemon
        shiny
      }
    }
  }
`;

export default function Raids() {
  const { data, loading, error } = useQuery(GET_ALL_RAID_TIERS);

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  const { getRaidTiers } = data;

  return (
    <>
      <Title color="#009dc8">Рейды</Title>
      {getRaidTiers.map((tier) => (
        <RaidTier key={tier.tier} id={tier.tier} tier={tier.raids} />
      ))}
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_ALL_RAID_TIERS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
}
