import { pokeGen } from 'lib/pokeGen';
import { pokeImg, pokeImgShiny } from 'lib/pokeImg';
import pokeCheckName from 'lib/pokeName';
import { pokeTypeColor } from 'lib/pokeTypes';
import styled from 'styled-components';

export interface PokeCardType {
  pokedex: number;
  name: string;
  type1: string;
  type2?: string;
  gen?: string;
  enableModal?: boolean;
  showModal?: (name: string) => void;
  activeTab?: string;
}

export function PokeCard(props: PokeCardType) {
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

  function getImgUrl() {
    if (activeTab === 'shiny') return `url(${pokeImgShiny(filteredName, pokedex)})`;
    return `url(${pokeImg(filteredName, pokedex)})`;
  }

  const imgUrl = getImgUrl();

  return (
    <Card
      onClick={() => enableModal && showModal && showModal(name)}
      enableModal={enableModal}
    >
      <CardType typeOneColor={typeOneColor} typeTwoColor={typeTwoColor}>
        <CardImg imgUrl={imgUrl}>
          <div>#{pokedex}</div>
          {gen && <div>{pokeGen(gen)}</div>}
        </CardImg>
      </CardType>
      <CardContent>{filteredName.toLowerCase()}</CardContent>
    </Card>
  );
}

const Card = styled.div<{
  enableModal?: boolean;
}>`
  max-width: 8.4rem;
  overflow: hidden;
  font-size: ${(p) => p.theme.font.size.xss};
  box-sizing: border-box;
  border-radius: ${(p) => p.theme.border.radius200};
  border: ${(p) => p.theme.border.border300};
  margin: 0.3rem 0.1rem;
  cursor: ${(p) => p.enableModal && 'pointer'};
  transition: box-shadow 0.25s;

  &:hover {
    box-shadow: ${(p) => (p.enableModal ? p.theme.lighting.shadow100 : 'none')};
    /* filter: saturate(140%) brightness(115%); */
    transition: box-shadow 0.25s;
  }
`;

const CardType = styled.div<{
  typeOneColor?: string;
  typeTwoColor?: string;
}>`
  background-image: linear-gradient(
    ${(p) =>
      p.typeTwoColor && p.typeOneColor
        ? `${p.typeTwoColor}, ${p.typeOneColor}`
        : `${p.typeOneColor}, ${p.typeOneColor}`}
  );
`;

const CardImg = styled.div.attrs(
  ({ imgUrl }: { imgUrl: string }) =>
    ({
      style: {
        backgroundImage: imgUrl as string,
      },
    } as any)
)`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  min-width: 8.2rem;
  min-height: 8.2rem;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  padding: 0 ${(p) => p.theme.spacing.s1};
  user-select: none;
  color: ${(p) => p.theme.color.white};
  letter-spacing: 1px;
  font-variant-numeric: tabular-nums;
`;

const CardContent = styled.div`
  font-size: ${(p) => p.theme.font.size.xs};
  text-align: center;
  text-transform: capitalize;
  padding: 0 ${(p) => p.theme.spacing.s1};
`;
