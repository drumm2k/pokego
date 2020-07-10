import styled from 'styled-components';
import PropTypes from 'prop-types';
import trainerTeam from '../lib/trainerTeam';
import TrainerCode from './ProfileTrainerCode';
import ProfileSocial from './ProfileSocial';
import ProfileFollowers from './ProfileFollowers';
import ProfileFollowing from './ProfileFollowing';
import PokeCard from './PokeCard';

const Profile = styled.div`
  display: grid;
  grid-gap: 1rem;
`;

const ProfileItemContainer = styled.div`
  padding: 2rem;
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgb(216, 216, 220);
`;

const PokeList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ProfileCard = ({ user }) => {
  return (
    <Profile>
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
        <p>id: {user.id}</p>
        {user.trainer.level && <p>{user.trainer.level} уровень</p>}
        {user.trainer.code && <TrainerCode trainerCode={user.trainer.code} />}
        {user.location.latitude && user.location.longtitude && (
          <p>
            Координаты: {user.location.latitude} {user.location.longtitude}
          </p>
        )}
        <p>Создан: {new Date(user.createdAt).toLocaleString()}</p>
      </ProfileItemContainer>

      <ProfileItemContainer>
        <div>
          <span>{user.following.length}</span> Following
          <ProfileFollowing following={user.following} />
        </div>
        <br />

        <div>
          <span>{user.followers.length}</span> Followers
          <ProfileFollowers followers={user.followers} />
        </div>
      </ProfileItemContainer>

      <ProfileItemContainer>
        <ProfileSocial telegram={user.telegram} />
      </ProfileItemContainer>

      <ProfileItemContainer>
        {user.tradeLists.map((list) => (
          <div key={list.id}>
            <div>id: {list.id}</div>
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
            <div>description: {list.description}</div>
            <div>private: {list.isPrivate}</div>
          </div>
        ))}
      </ProfileItemContainer>
    </Profile>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ProfileCard;
