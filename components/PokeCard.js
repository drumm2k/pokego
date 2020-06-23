import styled from 'styled-components';
import PropTypes from 'prop-types';
import checkName from '../lib/poke-name';
import { pokeTypeColor } from '../lib/poke-types';

const Card = styled.div`
  max-width: 8.5rem;
  overflow: hidden;
  font-size: 1.2rem;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #edf2f4;
  margin: 0.1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const CardType = styled.div`
  background-image: linear-gradient(
    ${(props) =>
      props.typeTwoColor
        ? `${props.typeTwoColor}, ${props.typeOneColor}`
        : `${props.typeOneColor}, ${props.typeOneColor}`}
  );
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const CardImg = styled.div.attrs((props) => ({
  style: {
    backgroundImage: props.imgUrl,
  },
}))`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  min-width: 8.2rem;
  min-height: 8.2rem;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  padding: 0.1rem 0.3rem;

  color: #fff;
`;

const CardContent = styled.div`
  font-size: 1.2rem;
  text-align: center;
`;

const PokeCard = (props) => {
  const { pokedex, name, gen, type1, type2 } = props;

  const filteredName = checkName(name)
    .toLowerCase()
    .replace(/^[^]/, (match) => match.toUpperCase());

  const generation = gen && gen.split('_')[1].replace(/^/, 'G');

  const typeOneColor = pokeTypeColor(type1);
  const typeTwoColor = pokeTypeColor(type2);

  return (
    <Card>
      <CardType typeOneColor={typeOneColor} typeTwoColor={typeTwoColor}>
        <CardImg imgUrl={`url(/img/pokemon/${pokedex}.png)`}>
          <div>#{pokedex}</div>
          <div>{generation}</div>
        </CardImg>
      </CardType>
      <CardContent>
        <div>{filteredName}</div>
      </CardContent>
    </Card>
  );
};

PokeCard.propTypes = {
  pokedex: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type1: PropTypes.string.isRequired,
  type2: PropTypes.string,
  gen: PropTypes.string,
};

PokeCard.defaultProps = {
  gen: '',
  type2: null,
};

export default PokeCard;
