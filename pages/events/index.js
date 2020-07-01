import Link from 'next/link';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { initializeApollo } from '../../lib/apolloClient';
import Event from '../../components/Event';
import Title from '../../components/Title';

export const GET_ALL_EVENTS = gql`
  query {
    getEvents {
      id
      name
      img
      description
      starts
      ends
    }
  }
`;

export default function Events() {
  const { data, loading, error } = useQuery(GET_ALL_EVENTS);

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  const { getEvents } = data;

  if (getEvents.length === 0)
    return (
      <div>
        <Title color="#ff3163">Ивенты</Title>
        Ивентов в данный момент нет.
      </div>
    );

  // Sort running events (by end Date)
  function sortEventsByEnd(arr) {
    arr.sort((a, b) => Date.parse(a.ends) - Date.parse(b.ends));
  }

  // Sort upcoming events (by start Date)
  function sortEventsByStart(arr) {
    arr.sort((a, b) => Date.parse(a.starts) - Date.parse(b.starts));
  }

  // Sort finished events (by end Date and reversed)
  function sortEventsByEndAndReverse(arr) {
    arr.sort((a, b) => Date.parse(a.ends) - Date.parse(b.ends)).reverse();
  }

  // Filter running events
  const events = getEvents.filter(
    (event) =>
      Date.parse(new Date()) - Date.parse(event.starts) > 0 &&
      Date.parse(event.ends) - Date.parse(new Date()) > 0
  );
  sortEventsByEnd(events);

  // Filter upcoming events
  const eventsUpcoming = getEvents.filter(
    (event) => Date.parse(event.starts) - Date.parse(new Date()) > 0
  );
  sortEventsByStart(eventsUpcoming);

  // Filter ended events
  const eventsEnded = getEvents.filter(
    (event) => Date.parse(event.ends) - Date.parse(new Date()) < 0
  );
  sortEventsByEndAndReverse(eventsEnded);

  return (
    <>
      <Title color="#ff3163">Ивенты</Title>

      <div>
        <h3>Активные</h3>
        {events &&
          events.map((event) => (
            <Link key={event.id} href="/events/[id]" as={`/events/${event.id}`}>
              <a>
                <Event
                  name={event.name}
                  description={event.description}
                  img={event.img}
                  starts={event.starts}
                  ends={event.ends}
                />
              </a>
            </Link>
          ))}
        <h3>Скоро</h3>
        {eventsUpcoming &&
          eventsUpcoming.map((event) => (
            <Link key={event.id} href="/events/[id]" as={`/events/${event.id}`}>
              <a>
                <Event
                  name={event.name}
                  description={event.description}
                  img={event.img}
                  starts={event.starts}
                  ends={event.ends}
                />
              </a>
            </Link>
          ))}
      </div>
      <div>
        <h3>Завершённые</h3>
        {eventsEnded &&
          eventsEnded.map((event) => (
            <Link key={event.id} href="/events/[id]" as={`/events/${event.id}`}>
              <a>
                <Event
                  name={event.name}
                  description={event.description}
                  img={event.img}
                  starts={event.starts}
                  ends={event.ends}
                />
              </a>
            </Link>
          ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_ALL_EVENTS,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    unstable_revalidate: 1,
  };
}
