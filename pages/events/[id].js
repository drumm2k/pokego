import styled from 'styled-components';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../../lib/apollo';
import Event from '../../components/Event';

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 1.5rem;
`;

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    getEvent(id: $id) {
      id
      name
      desc
      start
      end
      img
    }
  }
`;

const EventById = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { id },
  });

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  const { getEvent } = data;

  return (
    <div>
      <Title>{getEvent.name}</Title>
      <Event
        name={getEvent.name}
        desc={getEvent.desc}
        start={getEvent.start}
        end={getEvent.end}
        img={getEvent.img}
      />
    </div>
  );
};

export default withApollo({ ssr: true })(EventById);
