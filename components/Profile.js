import styled from 'styled-components';
import PropTypes from 'prop-types';

import ProfileCard from './ProfileCard';
import PokeCard from './PokeCard';

const ProfileContainer = styled.div`
  display: grid;
  grid-gap: ${(p) => p.theme.spacing.s12};
`;

const PokeList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Profile = ({ user }) => {
  return (
    <ProfileContainer>
      <ProfileCard
        userName={user.userName}
        trainer={user.trainer}
        location={user.location}
        social={user.social}
      />

      {/* {user.social && <ProfileSocial social={user.social} />} */}

      {user.tradeLists.map((list) => (
        <div key={list.id}>
          <div>
            Trade List: {list.pokemons.length} покемона
            <PokeList>
              {list.pokemons.map((pokemon) => (
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
};

Profile.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Profile;
