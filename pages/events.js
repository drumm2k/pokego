import React, { Component } from 'react';
import styled from 'styled-components';
import Event from '../components/Event';
import useSWR from 'swr';

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 1.5rem;
`;

const fetcher = (query) =>
  fetch('/api/graphql', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((json) => json.data);

export default function events() {
  const { data, error } = useSWR(
    '{ getEvents { id, name, desc, start, end, img } }',
    fetcher
  );

  if (error) return <div>Ошибка, не удалось загрузить данные...</div>;
  if (!data) return <div>Загружаю данные...</div>;

  const { getEvents } = data;

  if (getEvents.length === 0) return <div>Ивентов в данный момент нет.</div>;

  return (
    <div>
      <Title>Ивенты</Title>
      {getEvents.map((event) => (
        <Event
          key={event.id}
          name={event.name}
          desc={event.desc}
          start={event.start}
          end={event.end}
          img={event.img}
        />
      ))}
    </div>
  );
}
