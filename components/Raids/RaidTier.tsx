import styled from 'styled-components';
import { RaidCard } from './RaidCard';

interface PokemonRaidProps {
  name: string;
  pokedex: number;
  type1: string;
  type2: string;
  baseStamina: number;
  baseAttack: number;
  baseDefense: number;
}

interface RaidsProps {
  shiny: boolean;
  verified: boolean;
  cp: number;
  pokemon: PokemonRaidProps;
}

interface TiersDataProps {
  tier: string;
  raids: [RaidsProps];
}

interface RaidTierProps {
  tiersData: TiersDataProps;
}

export function RaidTier({ tiersData }: RaidTierProps) {
  const tier = tiersData.tier.replace(/[^0-9]/g, '');
  const tierIcon = [...Array(parseInt(tier, 10))].map((e, index) => {
    const key = tier + index;
    return (
      <img
        src="/img/raid.png"
        height="32"
        width="32"
        alt="Raid difficulty"
        key={key}
      />
    );
  });

  return (
    <>
      {tiersData.raids[0] && (
        <>
          <TierTitle>
            <h2>Уровень {tier}</h2>
            <TierIconContainer>{tierIcon}</TierIconContainer>
          </TierTitle>

          <Tier>
            {tiersData.raids.map((raid) => (
              <RaidCard
                key={raid.pokemon.name}
                id={raid.pokemon.pokedex}
                name={raid.pokemon.name}
                type1={raid.pokemon.type1}
                type2={raid.pokemon.type2}
                shiny={raid.shiny}
                baseStamina={raid.pokemon.baseStamina}
                baseAttack={raid.pokemon.baseAttack}
                baseDefense={raid.pokemon.baseDefense}
              />
            ))}
          </Tier>
        </>
      )}
    </>
  );
}

const TierTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(p) => p.theme.spacing.s2};
`;

const Tier = styled.div`
  display: grid;
  grid-row-gap: ${(p) => p.theme.spacing.s4};
  margin-bottom: ${(p) => p.theme.spacing.s8};

  /* Iphone 6,7,8 and up landscape mode */
  @media screen and (min-width: 667px) {
    grid-column-gap: 1%;
    grid-template-columns: 49.5% 49.5%;
  }
`;

const TierIconContainer = styled.div`
  line-height: 0;
`;
