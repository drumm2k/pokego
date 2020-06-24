import styled from 'styled-components';
import PropTypes from 'prop-types';
import { pokeTypeName, pokeTypeColor } from '../lib/poke-types';
import { pokeTypeWeather, pokeTypeWeatherImg } from '../lib/poke-weather';
import pokeGen from '../lib/poke-gen';
import pokeCalcCp from '../lib/poke-cp';
import pokeCheckName from '../lib/poke-name';
import pokeImg from '../lib/poke-img';

const ModalWindow = styled.div`
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50rem;
  height: 45rem;
  max-width: 100%;
  max-height: 100%;
  z-index: 20;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-image: linear-gradient(
    ${(props) =>
      props.typeTwoColor
        ? `${props.typeTwoColor}, ${props.typeOneColor}`
        : `${props.typeOneColor}, ${props.typeOneColor}`}
  );
`;

const ModalWindowGuts = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 2rem;
  overflow: auto;
  text-align: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.6);
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 1;
  width: 24px;
  height: 24px;
  opacity: 0.7;
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));

  &:hover {
    cursor: pointer;
    opacity: 1;
  }

  &:before,
  &:after {
    position: absolute;
    content: '';
    top: 0;
    left: 50%;
    height: 24px;
    width: 3px;
    background-color: #fff;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

const PokeTitle = styled.h3`
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));
`;

const PokeType = styled.span`
  display: inline-block;
  padding: 0.1rem 0.7rem;
  margin-right: 0.3rem;
  margin-bottom: 0.3rem;
  color: #eee;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  background-color: ${(props) => props.typeColor};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
`;

export default function PokedexModal({ modalStatus, showModal, modalPokemonData }) {
  if (!modalStatus || !modalPokemonData) {
    return null;
  }

  const {
    name,
    gen,
    pokedex,
    type1,
    type2,
    baseAttack,
    baseDefense,
    baseStamina,
    shiny,
    released,
    pokemonClass,
  } = modalPokemonData;

  // Filter name & get img
  const pokeName = pokeCheckName(name);
  const imgUrl = pokeImg(name, pokedex);

  // Get type names
  const typeOneName = pokeTypeName(type1);
  const typeTwoName = pokeTypeName(type2);

  // Get type colors
  const typeOneColor = pokeTypeColor(type1);
  const typeTwoColor = pokeTypeColor(type2);

  // Get weather icons
  const weather = pokeTypeWeather(type1, type2);
  const weatherImg = pokeTypeWeatherImg(weather);

  // Calc Max CP
  const cpMax = pokeCalcCp(baseAttack, baseStamina, baseDefense, 40, 15, 15, 15);

  return (
    <>
      <ModalWindow typeOneColor={typeOneColor} typeTwoColor={typeTwoColor}>
        <ModalWindowGuts>
          <PokeTitle>
            {pokeName} #{pokedex}
          </PokeTitle>
          <img src={imgUrl} alt={pokeName} width="96" height="96" />
          <div>
            {weatherImg.map((icon) => (
              <img src={icon} alt="weather" width="32" height="32" key={icon} />
            ))}
          </div>
          <div>
            <PokeType typeColor={typeOneColor}>{typeOneName}</PokeType>
            {type2 && <PokeType typeColor={typeTwoColor}>{typeTwoName}</PokeType>}
          </div>
          {gen && <p>Поколение: {pokeGen(gen)}</p>}
          <p>Атака: {baseAttack}</p>
          <p>Защита: {baseDefense}</p>
          <p>Выносливость: {baseStamina}</p>
          <p>Макс СР: {cpMax}</p>
          {shiny ? <p>Шайни: Да</p> : <p>Шайни: Нет</p>}
          {released ? (
            <p>Можно встретить в игре: Да</p>
          ) : (
            <p>Можно встретить в игре: Нет</p>
          )}
          {pokemonClass && <p>Тип: {pokemonClass}</p>}
          <ModalCloseButton type="button" onClick={() => showModal()} />
        </ModalWindowGuts>
      </ModalWindow>
      <ModalOverlay onClick={() => showModal()} />
    </>
  );
}

PokedexModal.propTypes = {
  modalStatus: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  modalPokemonData: PropTypes.oneOfType([PropTypes.object]),
};

PokedexModal.defaultProps = {
  modalPokemonData: null,
};
