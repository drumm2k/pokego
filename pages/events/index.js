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
      desc
      start
      end
      img
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

  return (
    <div>
      <Title>Ивенты</Title>
      {getEvents.map((event) => (
        <Link key={event.id} href="/events/[id]" as={`/events/${event.id}`}>
          <a>
            <Event
              name={event.name}
              desc={event.desc}
              start={event.start}
              end={event.end}
              img={event.img}
            />
          </a>
        </Link>
      ))}
    </div>
  );
}

export default withApollo({ ssr: true })(Events);
