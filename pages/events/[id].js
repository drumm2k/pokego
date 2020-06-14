import Router, { useRouter } from 'next/router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { initializeApollo } from '../../lib/apolloClient';
import Title from '../../components/Title';

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

export const GET_EVENTS_IDS = gql`
  query {
    getEvents {
      id
    }
  }
`;

export default function EventById() {
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(GET_EVENT, {
    variables: { id },
  });

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  const { getEvent } = data;

  return (
    <>
      <Title color="#ff3163">{getEvent.name}</Title>
      <img src={getEvent.img} alt={getEvent.name} />
      <p>{getEvent.description}</p>
      <p>{getEvent.descriptionFull}</p>
      <p>Начало: {new Date(getEvent.starts).toLocaleString()}</p>
      <p>Конец: {new Date(getEvent.ends).toLocaleString()}</p>
      <p>(местное время)</p>

      <button type="button" onClick={() => Router.back()}>
        ← Назад
      </button>
    </>
  );
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();

  await apolloClient.query({ query: GET_EVENT, variables: { id: params.id } });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo();

  const res = await apolloClient.query({ query: GET_EVENTS_IDS });
  const { getEvents } = res.data;

  const paths = getEvents.map((event) => ({
    params: { id: event.id },
  }));

  return {
    paths,
    fallback: true,
  };
}
