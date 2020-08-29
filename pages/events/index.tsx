import { gql, useQuery } from '@apollo/client';
import { Event } from 'components/Events/Event';
import { Title } from 'components/Title';
import { initializeApollo } from 'lib/apolloClient';
import Link from 'next/link';
import styled from 'styled-components';

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
  function sortEventsByEnd(arr: any) {
    arr.sort((a: any, b: any) => Date.parse(a.ends) - Date.parse(b.ends));
  }

  // Sort upcoming events (by start Date)
  function sortEventsByStart(arr: any) {
    arr.sort((a: any, b: any) => Date.parse(a.starts) - Date.parse(b.starts));
  }

  // Sort finished events (by end Date and reversed)
  function sortEventsByEndAndReverse(arr: any) {
    arr.sort((a: any, b: any) => Date.parse(a.ends) - Date.parse(b.ends)).reverse();
  }

  // Filter running events
  const events = getEvents.filter(
    (event: any) =>
      Date.parse(new Date() as any) - Date.parse(event.starts) > 0 &&
      Date.parse(event.ends) - Date.parse(new Date() as any) > 0
  );
  sortEventsByEnd(events);

  // Filter upcoming events
  const eventsUpcoming = getEvents.filter(
    (event: any) => Date.parse(event.starts) - Date.parse(new Date() as any) > 0
  );
  sortEventsByStart(eventsUpcoming);

  // Filter ended events
  const eventsEnded = getEvents.filter(
    (event: any) => Date.parse(event.ends) - Date.parse(new Date() as any) < 0
  );
  sortEventsByEndAndReverse(eventsEnded);

  return (
    <>
      <Title color="#ff3163">Ивенты</Title>

      {events && events.length > 0 && (
        <EventsContainer>
          <EventsStatus>Активные</EventsStatus>

          {events.map((event: any) => (
            <Link
              key={event.id}
              href="/events/[id]"
              as={`/events/${event.id}`}
              passHref
            >
              <StyledLink>
                <Event
                  name={event.name}
                  description={event.description}
                  img={event.img}
                  starts={event.starts}
                  ends={event.ends}
                />
              </StyledLink>
            </Link>
          ))}
        </EventsContainer>
      )}

      {eventsUpcoming && eventsUpcoming.length > 0 && (
        <EventsContainer>
          <EventsStatus>Скоро</EventsStatus>

          {eventsUpcoming.map((event: any) => (
            <Link
              key={event.id}
              href="/events/[id]"
              as={`/events/${event.id}`}
              passHref
            >
              <StyledLink>
                <Event
                  name={event.name}
                  description={event.description}
                  img={event.img}
                  starts={event.starts}
                  ends={event.ends}
                />
              </StyledLink>
            </Link>
          ))}
        </EventsContainer>
      )}

      {eventsEnded && eventsEnded.length > 0 && (
        <EventsContainer>
          <EventsStatus>Завершённые</EventsStatus>
          {eventsEnded.map((event: any) => (
            <Link
              key={event.id}
              href="/events/[id]"
              as={`/events/${event.id}`}
              passHref
            >
              <StyledLink>
                <Event
                  name={event.name}
                  description={event.description}
                  img={event.img}
                  starts={event.starts}
                  ends={event.ends}
                />
              </StyledLink>
            </Link>
          ))}
        </EventsContainer>
      )}
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
    revalidate: 1,
  };
}

const StyledLink = styled.a`
  &:hover {
    opacity: 1;
  }
`;

const EventsContainer = styled.div`
  margin-bottom: ${(p) => p.theme.spacing.s8};
`;

const EventsStatus = styled.h2`
  margin-bottom: ${(p) => p.theme.spacing.s2};
`;
