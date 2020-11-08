import styled, { keyframes } from 'styled-components';
import { pokeCalcCp } from '../../lib/pokeCp';
import { pokeEvoItemImages, pokeEvoItems } from '../../lib/pokeEvoItems';
import { pokeGenFull } from '../../lib/pokeGen';
import { pokeImg, pokeImgShiny } from '../../lib/pokeImg';
import pokeCheckName from '../../lib/pokeName';
import { pokeTypeColor, pokeTypeName } from '../../lib/pokeTypes';

interface PokedexModalType {
  modalStatus: boolean;
  showModal: () => void;
  modalPokemonData: any;
}

export function PokedexModal({
  modalStatus,
  showModal,
  modalPokemonData,
}: PokedexModalType) {
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
  // const weather = pokeTypeWeather(type1, type2);
  // const weatherImg = pokeTypeWeatherImg(weather);

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
                  evolutionBranch.map((branch: any) => (
                    <PokeStatsContainer key={branch.evolution}>
                      <p>ЭВОЛЮЦИИ</p>
                      <PokeStatsNumbers>{branch.evolution}</PokeStatsNumbers>
                      <p>КОНФЕТ</p>
                      <PokeStatsNumbers>{branch.candyCost}</PokeStatsNumbers>
                      {branch.evolutionItemRequirement && (
                        <>
                          <p>ПРЕДМЕТ</p>
                          <EvoItemContainer>
                            <img
                              src={pokeEvoItemImages(
                                branch.evolutionItemRequirement
                              )}
                              alt="Evolution Item"
                              width="24"
                              height="24"
                            />
                            <PokeStatsNumbers>
                              {pokeEvoItems(
                                branch.evolutionItemRequirement
                              ).toUpperCase()}
                            </PokeStatsNumbers>
                          </EvoItemContainer>
                        </>
                      )}
                      {branch.lureItemRequirement && (
                        <>
                          <p>ПРЕДМЕТ</p>
                          <EvoItemContainer>
                            <img
                              src={pokeEvoItemImages(branch.lureItemRequirement)}
                              alt="Evolution Item"
                              width="24"
                              height="24"
                            />
                            <PokeStatsNumbers>
                              {pokeEvoItems(
                                branch.lureItemRequirement
                              ).toUpperCase()}
                            </PokeStatsNumbers>
                          </EvoItemContainer>
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

const ModalWindowInner = styled.div<{ modalStatus: boolean }>`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  width: calc(100% - 1rem);
  height: 80%;
  margin: 0 ${(p) => p.theme.spacing.s2};
  border-radius: ${(p) => p.theme.border.radius300}
    ${(p) => p.theme.border.radius300} 0 0;
  background-color: ${(p) => p.theme.color.white};
  animation-name: ${modalOnEnterKeyframes};
  animation-duration: 0.25s;
  animation-timing-function: ease-in;

  @media screen and (min-device-width: 768px) {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60rem;
    height: 50rem;
    max-width: 80%;
    max-height: 100%;
    border-radius: ${(p) => p.theme.border.radius300};
    animation-name: none;
  }
`;

const ModalWindowGuts = styled.div`
  font-size: ${(p) => p.theme.font.size.sm};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: ${(p) => p.theme.spacing.s2};
  overflow: auto;
`;

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 25;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.modal.overlay};
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: ${(p) => p.theme.spacing.s8};
  right: ${(p) => p.theme.spacing.s8};
  z-index: 1;
  width: 2.4rem;
  height: 2.4rem;
  opacity: 0.7;
  filter: drop-shadow(${(p) => p.theme.lighting.hard});

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
    height: 2.4rem;
    width: 3px;
    background-color: ${(p) => p.theme.color.white};
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

const PokeCard = styled.div<{
  typeOneColor?: string;
  typeTwoColor?: string | null | undefined;
}>`
  color: ${(p) => p.theme.color.white};
  border-radius: ${(p) => p.theme.border.radius300};
  padding: ${(p) => p.theme.spacing.s6};
  box-shadow: ${(p) => p.theme.lighting.shadow200};
  background-image: linear-gradient(
    ${(props) =>
      props.typeTwoColor
        ? `${props.typeTwoColor}, ${props.typeOneColor}`
        : `${props.typeOneColor}, ${props.typeOneColor}`}
  );
`;

const PokeTitle = styled.h3`
  filter: drop-shadow(${(p) => p.theme.lighting.hard});
  max-width: 85%;
`;

const PokeTitlePokedex = styled.span`
  color: ${(p) => p.theme.color.orange};
`;

const PokeImg = styled.div`
  font-size: 0;
`;

const PokeWeather = styled.div`
  font-size: 0;
`;

const PokeInfoContainer = styled.div`
  padding: ${(p) => p.theme.spacing.s6};
`;

const PokeInfoItem = styled.div`
  flex: 1 1 0%;
  max-width: 50%;
`;

const PokeInfoTitles = styled.h4`
  margin-bottom: ${(p) => p.theme.spacing.s2};
`;

const PokeStatsContainer = styled.div`
  display: grid;
  grid-column-gap: ${(p) => p.theme.spacing.s4};
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
  padding-bottom: ${(p) => p.theme.spacing.s4};
`;

const PokeType = styled.span<{
  typeColor?: string;
}>`
  display: inline-block;
  padding: 0.1rem ${(p) => p.theme.spacing.s3};
  margin-right: ${(p) => p.theme.spacing.s1};
  margin-bottom: ${(p) => p.theme.spacing.s1};
  color: ${(p) => p.theme.color.gray50};
  font-size: ${(p) => p.theme.font.size.xs};
  font-weight: ${(p) => p.theme.font.weight.bold};
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  background-color: ${(p) => p.typeColor};
  box-shadow: ${(p) => p.theme.lighting.light};
  border-radius: ${(p) => p.theme.border.radius400};
`;

const EvoItemContainer = styled.div`
  display: flex;
  align-items: center;
`;
