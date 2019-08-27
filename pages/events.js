import styled from 'styled-components';
import Event from '../components/Event';

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 2.5rem;
`;

const EventList = styled.div``;

const Data = {
  events: [
    {
      name: 'Water Festival 2019',
      desc: 'Двойные конфеты и много водных покемонов.',
      start: 'Aug 27 2019 16:06:48 GMT-0700',
      end: 'Sep 27 2019 16:06:48 GMT-0700',
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/130.png'
    },
    {
      name: 'MewTwo in Raids',
      desc:
        'Mewtwo возвращается, на этот раз с шайни версией и новой атакой psystrike.',
      start: 'Aug 27 2019 16:06:48 GMT-0700',
      end: 'Sep 27 2019 16:06:48 GMT-0700',
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png'
    }
  ]
};

const now = new Date();
console.log(now);
console.log(now.getTime());

const Index = () => (
  <div>
    <Title>Ивенты</Title>
    <EventList>
      <Event
        name={Data.events[0].name}
        desc={Data.events[0].desc}
        timer={Data.events[0].start}
        img={Data.events[0].img}
      />
    </EventList>
  </div>
);

export default Index;
