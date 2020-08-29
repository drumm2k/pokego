import { gql, useQuery } from '@apollo/client';
import { Title } from 'components/Title';
import { initializeApollo } from 'lib/apolloClient';
import { GetStaticPaths, GetStaticProps } from 'next';
import Router, { useRouter } from 'next/router';

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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let id;
  if (params) {
    id = params.id;
  }
  const apolloClient = initializeApollo();

  await apolloClient.query({ query: GET_EVENT, variables: { id } });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const res = await apolloClient.query({ query: GET_EVENTS_IDS });
  const { getEvents } = res.data;

  const paths = getEvents.map((event: any) => ({
    params: { id: event.id },
  }));

  return {
    paths,
    fallback: true,
  };
};
