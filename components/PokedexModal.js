import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { pokeTypeName, pokeTypeColor } from '../lib/pokeTypes';
import { pokeTypeWeather, pokeTypeWeatherImg } from '../lib/pokeWeather';
import { pokeGenFull } from '../lib/pokeGen';
import pokeCalcCp from '../lib/pokeCp';
import pokeCheckName from '../lib/pokeName';
import { pokeImg, pokeImgShiny } from '../lib/pokeImg';

const ModalFullscreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 30;
`;

const modalOnEnterKeyframes = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
`;

const ModalWindowInner = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  width: calc(100% - 1rem);
  height: 80%;
  margin: 0 0.5rem;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: #fff;
  animation-name: ${modalOnEnterKeyframes};
  animation-duration: 300ms;
  animation-timing-function: ease-in;

  @media screen and (min-device-width: 768px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60rem;
    height: 50rem;
    max-width: 80%;
    max-height: 100%;
    border-radius: 10px;
    animation-name: none;
  }
`;

const ModalWindowGuts = styled.div`
  font-size: 1.6rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  overflow: auto;
`;

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 25;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

const PokeCard = styled.div`
  color: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-image: linear-gradient(
    ${(props) =>
      props.typeTwoColor
        ? `${props.typeTwoColor}, ${props.typeOneColor}`
        : `${props.typeOneColor}, ${props.typeOneColor}`}
  );
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
  padding: 1.5rem;
`;

const PokeInfoItem = styled.div`
  flex: 1 1 0%;
  max-width: 50%;
`;

const PokeInfoTitles = styled.h4`
  margin-bottom: 0.5rem;
`;

const PokeStatsContainer = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: 100% 100%;

  @media screen and (min-device-width: 768px) {
    grid-template-columns: 70% 100%;
  }
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
    evolutionBranch,
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
      <ModalFullscreen>
        <ModalWindowInner modalStatus={modalStatus}>
          <ModalWindowGuts>
            <PokeCard typeOneColor={typeOneColor} typeTwoColor={typeTwoColor}>
              <PokeTitle>
                {pokeName} <PokeTitlePokedex>#{pokedex}</PokeTitlePokedex>
              </PokeTitle>

              <PokeImg>
                <img src={imgUrl} alt={pokeName} width="96" height="96" />
                {imgUrlShiny && (
                  <img src={imgUrlShiny} alt={pokeName} width="96" height="96" />
                )}
              </PokeImg>

              <PokeType typeColor={typeOneColor}>{typeOneName}</PokeType>
              {type2 && <PokeType typeColor={typeTwoColor}>{typeTwoName}</PokeType>}

              {/* <PokeWeather>
                {weatherImg.map((icon) => (
                  <img
                    src={icon}
                    alt="Weather boost icon"
                    width="32"
                    height="32"
                    key={icon}
                  />
                ))}
              </PokeWeather> */}
            </PokeCard>
            <PokeInfoContainer>
              <PokeInfoItem>
                <PokeTypeContainer>
                  <PokeStatsContainer>
                    {gen && (
                      <>
                        <p>ПОКОЛЕНИЕ</p>
                        <PokeStatsNumbers>
                          {pokeGenFull(gen).toUpperCase()}
                        </PokeStatsNumbers>
                      </>
                    )}
                    <p>ДОСТУПЕН В ИГРЕ</p>
                    <PokeStatsNumbers>
                      {released ? <span>ДА</span> : <span>НЕТ</span>}
                    </PokeStatsNumbers>
                    <p>БЫВАЕТ ШАЙНИ</p>
                    <PokeStatsNumbers>
                      {shiny ? <span>ДА</span> : <span>НЕТ</span>}
                    </PokeStatsNumbers>
                    {(pokemonClass === 'POKEMON_CLASS_LEGENDARY' && (
                      <>
                        <p>ТИП</p>
                        <PokeStatsNumbers>ЛЕГЕНДАРНЫЙ</PokeStatsNumbers>
                      </>
                    )) ||
                      (pokemonClass === 'POKEMON_CLASS_MYTHIC' && (
                        <>
                          <p>ТИП</p>
                          <PokeStatsNumbers>МИФИЧЕСКИЙ</PokeStatsNumbers>
                        </>
                      ))}
                  </PokeStatsContainer>
                </PokeTypeContainer>
              </PokeInfoItem>
              <PokeInfoItem>
                <PokeInfoTitles>СТАТЫ</PokeInfoTitles>
                <PokeStatsContainer>
                  <p>MAX СР</p>
                  <PokeStatsNumbers>{cpMax}</PokeStatsNumbers>
                  <p>АТАКА</p>
                  <PokeStatsNumbers>{baseAttack}</PokeStatsNumbers>
                  <p>ЗАЩИТА</p>
                  <PokeStatsNumbers>{baseDefense}</PokeStatsNumbers>
                  <p>ВЫНОСЛИВОСТЬ</p>
                  <PokeStatsNumbers>{baseStamina}</PokeStatsNumbers>
                </PokeStatsContainer>
                {evolutionBranch.length > 0 &&
                  evolutionBranch.map((branch) => (
                    <PokeStatsContainer key={branch.evolution}>
                      <p>ЭВОЛЮЦИИ</p>
                      <PokeStatsNumbers>{branch.evolution}</PokeStatsNumbers>
                      <p>КОНФЕТ</p>
                      <PokeStatsNumbers>{branch.candyCost}</PokeStatsNumbers>
                      {branch.evolutionItemRequirement && (
                        <>
                          <p>ПРЕДМЕТ</p>
                          <PokeStatsNumbers>
                            {branch.evolutionItemRequirement}
                          </PokeStatsNumbers>
                        </>
                      )}
                    </PokeStatsContainer>
                  ))}
              </PokeInfoItem>
            </PokeInfoContainer>

            <ModalCloseButton type="button" onClick={() => showModal()} />
          </ModalWindowGuts>
        </ModalWindowInner>
        <ModalOverlay onClick={() => showModal()} />
      </ModalFullscreen>
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
