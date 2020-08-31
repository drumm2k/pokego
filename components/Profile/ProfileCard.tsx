import { trainerColor, trainerTeam } from 'lib/trainerTeam';
import styled from 'styled-components';
import { ProfileSocial } from './ProfileSocial';
import { ProfileTrainerCode } from './ProfileTrainerCode';

type TrainerProps = {
  level: number;
  team: string;
  code: string;
};

type LocationProps = {
  latitude: number;
  longtitude: number;
};

type SocialProps = {
  telegram?: string;
  discord?: string;
};

export type ProfileCardProps = {
  userName: string;
  trainer: TrainerProps;
  location: LocationProps;
  social: SocialProps;
};

export function ProfileCard({
  userName,
  trainer,
  location,
  social,
}: ProfileCardProps) {
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

      {trainer.code && <ProfileTrainerCode trainerCode={trainer.code} />}
      {location.latitude && location.longtitude && (
        <p>
          Координаты: {location.latitude} {location.longtitude}
        </p>
      )}
    </ProfileCardContainer>
  );
}

const ProfileCardContainer = styled.div<{ teamColor: string | null }>`
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

const ProfileInfo = styled.div<{ teamImg: string }>`
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
