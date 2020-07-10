import styled from 'styled-components';
import PropTypes from 'prop-types';
import pokeCheckName from '../lib/pokeName';
import { pokeTypeColor } from '../lib/pokeTypes';
import { pokeGen } from '../lib/pokeGen';
import { pokeImg, pokeImgShiny } from '../lib/pokeImg';

const Card = styled.div`
  max-width: 8.4rem;
  overflow: hidden;
  font-size: 1.2rem;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid rgb(216, 216, 220);
  margin: 0.3rem 0.1rem;
  cursor: ${(props) => props.enableModal && 'pointer'};
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: ${(props) =>
      props.enableModal
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        : 'none'};
    /* filter: saturate(140%) brightness(115%); */
    transition: box-shadow 0.3s;
  }
`;

const CardType = styled.div`
  background-image: linear-gradient(
    ${(props) =>
      props.typeTwoColor
        ? `${props.typeTwoColor}, ${props.typeOneColor}`
        : `${props.typeOneColor}, ${props.typeOneColor}`}
  );
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
  padding: 0 0.3rem;
  user-select: none;
  color: #fff;
  letter-spacing: 1px;
  font-variant-numeric: tabular-nums;
`;

const CardContent = styled.div`
  font-size: 1.4rem;
  text-align: center;
  text-transform: capitalize;
  padding: 0 0.3rem;
`;

const PokeCard = (props) => {
  const {
    pokedex,
    name,
    gen,
    type1,
    type2,
    enableModal,
    showModal,
    activeTab,
  } = props;

  const filteredName = pokeCheckName(name);

  const typeOneColor = pokeTypeColor(type1);
  const typeTwoColor = pokeTypeColor(type2);

  const imgUrl = `url(${pokeImg(filteredName, pokedex)})`;
  const imgUrlShiny = `url(${pokeImgShiny(filteredName, pokedex)})`;

  return (
    <Card onClick={() => enableModal && showModal(name)} enableModal={enableModal}>
      <CardType typeOneColor={typeOneColor} typeTwoColor={typeTwoColor}>
        <CardImg imgUrl={activeTab === 'shiny' ? imgUrlShiny : imgUrl}>
          <div>#{pokedex}</div>
          <div>{gen && pokeGen(gen)}</div>
        </CardImg>
      </CardType>
      <CardContent>{filteredName.toLowerCase()}</CardContent>
    </Card>
  );
};

PokeCard.propTypes = {
  pokedex: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type1: PropTypes.string.isRequired,
  type2: PropTypes.string,
  gen: PropTypes.string,
  enableModal: PropTypes.bool,
  showModal: PropTypes.func,
  activeTab: PropTypes.string,
};

PokeCard.defaultProps = {
  gen: '',
  type2: null,
  enableModal: false,
  showModal: null,
  activeTab: null,
};

export default PokeCard;
