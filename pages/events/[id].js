import styled from 'styled-components';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Event from '../../components/Event';
import fetcher from '../../lib/fetcher';

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 1.5rem;
`;

const EventById = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(
    `query { getEvent(id: ${id}) { id, name, desc, start, end, img } }`,
    fetcher
  );

  if (error)
    return (
      <div>
        <Title>Ивент</Title>
        <p>Ошибка, не удалось загрузить данные...</p>
      </div>
    );
  if (!data)
    return (
      <div>
        <Title>Ивент</Title>
        <p>Загружаю данные...</p>
      </div>
    );

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

export default EventById;
