import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Link from 'next/link';
import { withApollo } from '../../lib/apollo';
import Event from '../../components/Event';

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 1.5rem;
`;

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

function Events() {
  const { data, loading, error } = useQuery(GET_ALL_EVENTS);

  if (error) return <div>Error</div>;
  if (loading) return <div>Loading</div>;

  const { getEvents } = data;

  if (getEvents.length === 0)
    return (
      <div>
        <Title>Ивенты</Title>
        Ивентов в данный момент нет.
      </div>
    );

  // Function to sort Events by Date
  function sortEvents(arr) {
    arr.sort((a, b) => Date.parse(a.ends) - Date.parse(b.ends));
  }

  // Function to sort and reverse Events by Date
  function sortAndReverseEvents(arr) {
    arr.sort((a, b) => Date.parse(a.ends) - Date.parse(b.ends)).reverse();
  }

  // Filter running events
  const events = getEvents.filter(
    (event) =>
      Date.parse(new Date()) - Date.parse(event.starts) > 0 &&
      Date.parse(event.ends) - Date.parse(new Date()) > 0
  );
  sortAndReverseEvents(events);

  // Filter upcoming events
  const eventsUpcoming = getEvents.filter(
    (event) => Date.parse(event.starts) - Date.parse(new Date()) > 0
  );
  sortEvents(eventsUpcoming);

  // Filter ended events
  const eventsEnded = getEvents.filter(
    (event) => Date.parse(event.ends) - Date.parse(new Date()) < 0
  );
  sortAndReverseEvents(eventsEnded);

  return (
    <div>
      <Title>Ивенты</Title>
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
  );
}

export default withApollo({ ssr: true })(Events);
