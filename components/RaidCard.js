import styled from 'styled-components';
import PropTypes from 'prop-types';
import { pokeTypeName, pokeTypeColor } from '../lib/poke-types';

const Card = styled.div`
  color: #eee;
  font-size: 1.4rem;
  font-weight: 700;
  display: grid;
  grid-template-columns: 7rem auto;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  padding: 1.5rem 1rem;
  border-radius: 10px;
  max-width: 40rem;
  background-image: linear-gradient(
    to right,
    ${(props) =>
      props.typeTwoColor
        ? `${props.typeOneColor}, ${props.typeTwoColor}`
        : `${props.typeOneColor}, ${props.typeOneColor}`}
  );
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const CardImg = styled.div`
  position: relative;
  border-radius: 5px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-image: url(${(props) => props.imgUrl});
  width: 7.5rem;
  height: 7.5rem;
`;

const Shiny = styled.div`
  position: absolute;
  right: 0.3rem;
  width: 2.5rem;
  height: 2.5rem;
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background-color: #fcd768;
    width: 1.3rem;
    height: 1.3rem;
    clip-path: polygon(
      50% 0%,
      65% 35%,
      100% 50%,
      65% 65%,
      50% 100%,
      35% 65%,
      0 50%,
      35% 35%
    );
  }

  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 0.5rem;
    background-color: #fcd768;
    width: 1.5rem;
    height: 1.5rem;
    clip-path: polygon(
      50% 0%,
      65% 35%,
      100% 50%,
      65% 65%,
      50% 100%,
      35% 65%,
      0 50%,
      35% 35%
    );
  }
`;

const PokeType = styled.span`
  display: inline-block;
  padding: 0.1rem 0.7rem;
  margin: 0.2rem;
  color: #000;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  background-color: #fcd768;
  border-radius: 15px;
`;

const RaidCard = (props) => {
  const { id, name, type, type2, shiny } = props;

  // Get type names
  const typeOne = pokeTypeName(type);
  const typeTwo = pokeTypeName(type2);

  // Get type colors
  const typeOneColor = pokeTypeColor(type);
  const typeTwoColor = pokeTypeColor(type2);

  return (
    <Card typeOneColor={typeOneColor} typeTwoColor={typeTwoColor}>
      <CardImg imgUrl={`/img/pokemon/${id}.png`}>{shiny && <Shiny />}</CardImg>

      <div>
        <div>{name}</div>
        <PokeType>{typeOne}</PokeType>
        {type2 && <PokeType>{typeTwo}</PokeType>}
      </div>
    </Card>
  );
};

RaidCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  type2: PropTypes.string,
  shiny: PropTypes.bool.isRequired,
};

RaidCard.defaultProps = {
  type2: null,
};

export default RaidCard;
