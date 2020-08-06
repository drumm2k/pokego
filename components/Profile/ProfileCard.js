import PropTypes from 'prop-types';
import styled from 'styled-components';
import trainerTeam, { trainerColor } from '../../lib/trainerTeam';
import ProfileSocial from './ProfileSocial';
import TrainerCode from './ProfileTrainerCode';

const ProfileCardContainer = styled.div`
  color: ${(p) => p.theme.color.white};
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 1rem;
  padding: ${(p) => p.theme.spacing.s6};
  max-width: 45rem;
  background-color: ${(p) => p.teamColor};
  box-shadow: ${(p) => p.theme.lighting.shadow200};
  border-radius: ${(p) => p.theme.border.radius300};
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: ${(p) => p.teamImg};
  background-repeat: no-repeat;
  background-position: 50% 50%;
  min-height: 18rem;

  h2 {
    filter: drop-shadow(${(p) => p.theme.lighting.hard});
  }

  span {
    font-size: ${(p) => p.theme.font.size.md};
    font-weight: ${(p) => p.theme.font.weight.bold};
    line-height: 3.2rem;
  }
`;

export default function ProfileCard({ userName, trainer, location, social }) {
  const teamImage = `url(${trainerTeam(trainer.team)})`;
  return (
    <ProfileCardContainer teamColor={trainerColor(trainer.team)}>
      {/* <img src={trainerTeam(trainer.team)} alt="team" width="128" heigth="128" /> */}
      <ProfileInfo teamImg={teamImage}>
        <div>
          <h2>{userName}</h2>
          <span>{trainer.level} уровень</span>
        </div>

        {social && <ProfileSocial social={social} />}
      </ProfileInfo>

      {trainer.code && <TrainerCode trainerCode={trainer.code} />}
      {location.latitude && location.longtitude && (
        <p>
          Координаты: {location.latitude} {location.longtitude}
        </p>
      )}
    </ProfileCardContainer>
  );
}

ProfileCard.propTypes = {
  userName: PropTypes.string.isRequired,
  trainer: PropTypes.shape({
    code: PropTypes.string,
    level: PropTypes.number.isRequired,
    team: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    latitude: PropTypes.number,
    longtitude: PropTypes.number,
  }),
  social: PropTypes.shape({
    telegram: PropTypes.string,
    discord: PropTypes.string,
  }),
};

ProfileCard.defaultProps = {
  location: null,
  social: null,
};
