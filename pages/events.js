import styled from 'styled-components';
import Event from '../components/Event';

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 2.5rem;
`;

const EventList = styled.div``;

const eventData = {
  name: 'Water Festival 2019',
  desc: 'Двойные конфеты и много водных покемонов.',
  timer: 'Осталось 5 д 1 ч 39 м 55 с',
  img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/130.png'
};

const eventData2 = {
  name: 'MewTwo in Raids',
  desc:
    'Mewtwo возвращается, на этот раз с шайни версией и новой атакой psystrike.',
  timer: 'Старт через 3 д 1 ч 39 м 55 с',
  img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png'
};

const Index = () => (
  <div>
    <Title>Ивенты</Title>
    <EventList>
      <Event
        name={eventData.name}
        desc={eventData.desc}
        timer={eventData.timer}
        img={eventData.img}
      />
      <Event
        name={eventData2.name}
        desc={eventData2.desc}
        timer={eventData2.timer}
        img={eventData2.img}
      />
    </EventList>
  </div>
);

export default Index;
