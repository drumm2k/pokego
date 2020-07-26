import styled from 'styled-components';
import PropTypes from 'prop-types';
import trainerTeam from '../lib/trainerTeam';
import TrainerCode from './ProfileTrainerCode';
import ProfileSocial from './ProfileSocial';
import PokeCard from './PokeCard';

const ProfileContainer = styled.div`
  display: grid;
  grid-gap: ${(p) => p.theme.spacing.s4};
`;

const ProfileItemContainer = styled.div`
  padding: ${(p) => p.theme.spacing.s8};
  max-width: 100%;
  border-radius: ${(p) => p.theme.border.radius300};
  box-shadow: ${(p) => p.theme.lighting.shadow100};
  border: ${(p) => p.theme.border.border300};
`;

const PokeList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Profile = ({ user }) => {
  return (
    <ProfileContainer>
      <ProfileItemContainer>
        {user.trainer.team && (
          <img
            src={trainerTeam(user.trainer.team)}
            alt="team"
            width="128"
            heigth="128"
          />
        )}
        <h3>{user.userName}</h3>
        {user.trainer.level && <p>{user.trainer.level} уровень</p>}
        {user.trainer.code && <TrainerCode trainerCode={user.trainer.code} />}
        {user.location.latitude && user.location.longtitude && (
          <p>
            Координаты: {user.location.latitude} {user.location.longtitude}
          </p>
        )}
        <p>Создан: {new Date(user.createdAt).toLocaleString()}</p>
      </ProfileItemContainer>

      {user.social && (
        <ProfileItemContainer>
          <ProfileSocial social={user.social} />
        </ProfileItemContainer>
      )}

      <ProfileItemContainer>
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
      </ProfileItemContainer>
    </ProfileContainer>
  );
};

Profile.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Profile;
