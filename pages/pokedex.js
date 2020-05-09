import styled from 'styled-components';
import PokeGenList from '../components/PokeGenList';

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 1.5rem;
`;

const Pokedex = () => (
  <div>
    <Title>Покедекс</Title>
    <PokeGenList gen={'1'} />
    <PokeGenList gen={'2'} />
  </div>
);

export default Pokedex;
