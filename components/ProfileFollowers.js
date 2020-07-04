import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import trainerTeam from '../lib/trainerTeam';

const FriendContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const FriendCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileFollowers = ({ followers }) => {
  return (
    <FriendContainer>
      {followers.map((follower) => (
        <Link
          key={follower.follower.userName}
          href="/user/[id]"
          as={`/user/${follower.follower.userName}`}
          prefetch={false}
        >
          <a>
            <FriendCell key={follower.follower.userName}>
              {follower.follower.trainerTeam && (
                <img
                  src={trainerTeam(follower.follower.trainerTeam)}
                  alt="team"
                  width="64"
                  heigth="64"
                />
              )}

              {follower.follower.userName}
            </FriendCell>
          </a>
        </Link>
      ))}
    </FriendContainer>
  );
};

ProfileFollowers.propTypes = {
  followers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProfileFollowers;
