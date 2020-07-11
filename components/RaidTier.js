import styled from 'styled-components';
import PropTypes, { object } from 'prop-types';
import RaidCard from './RaidCard';
import Stack from './Stack';

const TierTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Tier = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  margin-bottom: 2.5rem;

  /* Iphone 6,7,8 and up landscape mode */
  @media screen and (min-width: 667px) {
    grid-column-gap: 1%;
    grid-template-columns: 49.5% 49.5%;
  }
`;

const TierIconContainer = styled.div`
  height: 2.8rem;
`;

export default function RaidTier(props) {
  const { id, tiersData } = props;

  const tier = id.replace(/[^0-9]/g, '');
  const tierIcon = [...Array(parseInt(tier, 10))].map((e, index) => {
    const key = tier + index;
    return (
      <img
        src="/img/raid.png"
        height="28"
        width="28"
        alt="Raid difficulty"
        key={key}
      />
    );
  });

  return (
    <>
      <TierTitle>
        <h4>Уровень {tier}</h4>
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
