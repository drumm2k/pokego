import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../lib/apollo';
import RaidTier from '../components/RaidTier';

const Title = styled.h2`
  color: #009dc8;
  margin-bottom: 1.5rem;
`;

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

function Raids() {
  const {
    data: tiers,
    loading: tiersQueryLoading,
    error: tiersQueryError,
  } = useQuery(GET_ALL_RAID_TIERS);

  if (tiersQueryError) return <div>Error</div>;
  if (tiersQueryLoading) return <div>Loading</div>;

  return (
    <div>
      <Title>Рейды</Title>
      {tiers.getRaidTiers.map((tier) => (
        <RaidTier key={tier.tier} id={tier.tier} tier={tier.raids} />
      ))}
    </div>
  );
}

export default withApollo({ ssr: true })(Raids);
