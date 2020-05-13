import styled from 'styled-components';
import PokeGenList from '../components/PokeGenList';

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 1.5rem;
`;

const Pokedex = () => (
  <div>
    <Title>Покедекс</Title>
    <PokeGenList />
  </div>
);

export default Pokedex;
