import { PokeCard } from 'components/PokeCard';
import styled from 'styled-components';
import { ProfileCard } from './ProfileCard';

export function Profile({ user }: any) {
  return (
    <ProfileContainer>
      <ProfileCard
        userName={user.userName}
        trainer={user.trainer}
        location={user.location}
        social={user.social}
      />

      {user.tradeLists.map((list: any) => (
        <div key={list.id}>
          <div>
            Trade List: {list.pokemons.length} покемона
            <PokeList>
              {list.pokemons.map((pokemon: any) => (
                <PokeCard
                  key={pokemon.name}
                  pokedex={pokemon.pokedex}
                  name={pokemon.name}
                  gen={pokemon.gen}
                  type1={pokemon.type1}
                  type2={pokemon.type2}
                />
              ))}
            </PokeList>
          </div>
        </div>
      ))}
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: grid;
  grid-gap: ${(p) => p.theme.spacing.s12};
`;

const PokeList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
