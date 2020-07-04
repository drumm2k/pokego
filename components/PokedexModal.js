import styled from 'styled-components';
import PropTypes from 'prop-types';
import { pokeTypeName, pokeTypeColor } from '../lib/pokeTypes';
import { pokeTypeWeather, pokeTypeWeatherImg } from '../lib/pokeWeather';
import pokeGen from '../lib/pokeGen';
import pokeCalcCp from '../lib/pokeCp';
import pokeCheckName from '../lib/pokeName';
import { pokeImg, pokeImgShiny } from '../lib/pokeImg';

const ModalWindow = styled.div`
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50rem;
  height: 35rem;
  max-width: 95%;
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
  font-size: 1.6rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 3rem;
  overflow: auto;
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
  top: 3rem;
  right: 3rem;
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
  max-width: 85%;
`;

const PokeTitlePokedex = styled.span`
  color: #fcd768;
`;

const PokeImg = styled.div`
  font-size: 0;
`;

const PokeWeather = styled.div`
  font-size: 0;
`;

const PokeInfoContainer = styled.div`
  display: flex;
`;

const PokeInfoItem = styled.div`
  flex: 1 1 0%;
  max-width: 50%;
`;

const PokeInfoTitles = styled.h4`
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));
  margin-bottom: 0.5rem;
`;

const PokeStatsContainer = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: 65% auto;
`;

const PokeStatsNumbers = styled.p`
  letter-spacing: 1px;
  font-variant-numeric: tabular-nums;
`;

const PokeTypeContainer = styled.div`
  padding-bottom: 1rem;
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

  let imgUrlShiny;
  if (shiny) imgUrlShiny = pokeImgShiny(name, pokedex);

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
            {pokeName} <PokeTitlePokedex>#{pokedex}</PokeTitlePokedex>
          </PokeTitle>

          <PokeImg>
            <img src={imgUrl} alt={pokeName} width="96" height="96" />
            {imgUrlShiny && (
              <img src={imgUrlShiny} alt={pokeName} width="96" height="96" />
            )}
          </PokeImg>
          <PokeInfoContainer>
            <PokeInfoItem>
              <PokeTypeContainer>
                <PokeInfoTitles>ТИП</PokeInfoTitles>
                <PokeType typeColor={typeOneColor}>{typeOneName}</PokeType>
                {type2 && (
                  <PokeType typeColor={typeTwoColor}>{typeTwoName}</PokeType>
                )}
              </PokeTypeContainer>
              <PokeTypeContainer>
                <PokeWeather>
                  {weatherImg.map((icon) => (
                    <img
                      src={icon}
                      alt="Weather boost icon"
                      width="32"
                      height="32"
                      key={icon}
                    />
                  ))}
                </PokeWeather>
                {gen && <p>ПОКОЛЕНИЕ: {pokeGen(gen)}</p>}
                {(pokemonClass === 'POKEMON_CLASS_LEGENDARY' && (
                  <p>ТИП: ЛЕГЕНДАРНЫЙ</p>
                )) ||
                  (pokemonClass === 'POKEMON_CLASS_MYTHIC' && (
                    <p>ТИП: МИФИЧЕСКИЙ</p>
                  ))}
              </PokeTypeContainer>
            </PokeInfoItem>
            <PokeInfoItem>
              <PokeInfoTitles>СТАТЫ</PokeInfoTitles>
              <PokeStatsContainer>
                <p>МАКС СР</p>
                <PokeStatsNumbers>{cpMax}</PokeStatsNumbers>
                <p>АТАКА</p>
                <PokeStatsNumbers>{baseAttack}</PokeStatsNumbers>
                <p>ЗАЩИТА</p>
                <PokeStatsNumbers>{baseDefense}</PokeStatsNumbers>
                <p>ЗДОРОВЬЕ</p>
                <PokeStatsNumbers>{baseStamina}</PokeStatsNumbers>
                <p>ШАЙНИ</p>
                <PokeStatsNumbers>
                  {shiny ? <span>ДА</span> : <span>НЕТ</span>}
                </PokeStatsNumbers>
                <p>В ИГРЕ</p>
                <PokeStatsNumbers>
                  {released ? <span>ДА</span> : <span>НЕТ</span>}
                </PokeStatsNumbers>
              </PokeStatsContainer>
            </PokeInfoItem>
          </PokeInfoContainer>
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
