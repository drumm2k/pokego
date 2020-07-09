import styled from 'styled-components';
import PropTypes, { object } from 'prop-types';
import RaidCard from './RaidCard';
import Stack from './Stack';

const TierTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Tier = styled.div`
  display: grid;
  grid-row-gap: 1rem;

  @media (min-width: 768px) {
    grid-column-gap: 1%;
    grid-template-columns: 49.5% 49.5%;
  }
`;

export default function RaidTier(props) {
  const { id, tiersData } = props;

  const tier = id.replace(/[^0-9]/g, '');
  const tierIcon = [...Array(parseInt(tier, 10))].map((e, index) => {
    const key = tier + index;
    return (
      <img src="/img/raid.png" height="30" width="30" alt="raid tier" key={key} />
    );
  });

  return (
    <Stack gap="2" onlyBottom>
      <TierTitle>
        <h3>Уровень {tier}</h3>
        <div>{tierIcon}</div>
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
    </Stack>
  );
}

RaidTier.propTypes = {
  id: PropTypes.string.isRequired,
  tiersData: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
