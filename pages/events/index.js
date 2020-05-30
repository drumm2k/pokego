import styled from 'styled-components';
import useSWR from 'swr';
import Link from 'next/link';
import Event from '../../components/Event';
import fetcher from '../../lib/fetcher';

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 1.5rem;
`;

export default function Events() {
  const { data, error } = useSWR(
    'query { getEvents { id, name, desc, start, end, img } }',
    fetcher
  );

  if (error)
    return (
      <div>
        <Title>Ивенты</Title>
        <p>Ошибка, не удалось загрузить данные...</p>
      </div>
    );
  if (!data)
    return (
      <div>
        <Title>Ивенты</Title>
        <p>Загружаю данные...</p>
      </div>
    );

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
