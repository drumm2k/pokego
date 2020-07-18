import styled from 'styled-components';
import PropTypes, { object } from 'prop-types';
import RaidCard from './RaidCard';

const TierTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(p) => p.theme.spacing.s2};
`;

const Tier = styled.div`
  display: grid;
  grid-row-gap: ${(p) => p.theme.spacing.s4};
  margin-bottom: ${(p) => p.theme.spacing.s10};

  /* Iphone 6,7,8 and up landscape mode */
  @media screen and (min-width: 667px) {
    grid-column-gap: 1%;
    grid-template-columns: 49.5% 49.5%;
  }
`;

const TierIconContainer = styled.div`
  line-height: 0;
`;

export default function RaidTier(props) {
  const { id, tiersData } = props;

  const tier = id.replace(/[^0-9]/g, '');
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
  );
}

RaidTier.propTypes = {
  id: PropTypes.string.isRequired,
  tiersData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
