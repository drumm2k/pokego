import styled from 'styled-components';
import PropTypes from 'prop-types';
import trainerTeam from '../lib/trainerTeam';
import TrainerCode from './ProfileTrainerCode';
import ProfileSocial from './ProfileSocial';
import ProfileFollowers from './ProfileFollowers';
import ProfileFollowing from './ProfileFollowing';
import PokeCard from './PokeCard';

const PokeList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ProfileCard = ({ user }) => {
  return (
    <>
      <h3>
        {user.userName} (id: {user.id})
      </h3>
      {user.trainerTeam && (
        <img
          src={trainerTeam(user.trainerTeam)}
          alt="team"
          width="128"
          heigth="128"
        />
      )}
      <p>{user.trainerLevel} уровень</p>
      <TrainerCode trainerCode={user.trainerCode} />
      <p>
        Координаты: {user.locLatitude} {user.locLongtitude}
      </p>
      <ProfileSocial telegram={user.telegram} />
      <br />

      <div>
        trade lists:
        {user.tradeLists.map((list) => (
          <div key={list.id}>
            <div>id: {list.id}</div>
            <div>
              {list.pokemons.length} видов покемонов на трейд
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
      </div>
      <br />
      <div>
        <span>{user.following.length}</span> Following
        <ProfileFollowing following={user.following} />
      </div>
      <br />

      <div>
        <span>{user.followers.length}</span> Followers
        <ProfileFollowers followers={user.followers} />
      </div>
      <br />
      <p>Создан: {new Date(user.createdAt).toLocaleString()}</p>
      <br />
    </>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ProfileCard;
