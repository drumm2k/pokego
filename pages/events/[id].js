import styled from 'styled-components';
import Router, { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { withApollo } from '../../lib/apollo';

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 1.5rem;
`;

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    getEvent(id: $id) {
      id
      name
      img
      imgFull
      description
      descriptionFull
      starts
      ends
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
      <img src={getEvent.img} alt={getEvent.name} />
      <p>{getEvent.description}</p>
      <p>{getEvent.descriptionFull}</p>
      <p>{getEvent.starts}</p>
      <p>{getEvent.ends}</p>
      <button type="button" onClick={() => Router.back()}>
        Назад
      </button>
    </div>
  );
};

export default withApollo({ ssr: true })(EventById);
