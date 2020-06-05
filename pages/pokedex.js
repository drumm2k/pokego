import styled from 'styled-components';
import PokeGenList from '../components/PokeGenList';

const Title = styled.h2`
  color: #bb00c8;
  margin-bottom: 1.5rem;
`;

const Pokedex = () => (
  <div>
    <Title>Покедекс</Title>
    <PokeGenList />
  </div>
);

export default Pokedex;
