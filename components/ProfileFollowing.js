import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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

const ProfileFollowing = ({ following }) => {
  return (
    <FriendContainer>
      {following.map((follower) => (
        <Link
          key={follower.user.userName}
          href="/user/[id]"
          as={`/user/${follower.user.userName}`}
          prefetch={false}
        >
          <a>
            <FriendCell key={follower.user.userName}>
              {follower.user.trainerTeam && (
                <img
                  src={trainerTeam(follower.user.trainerTeam)}
                  alt="team"
                  width="64"
                  heigth="64"
                />
              )}

              {follower.user.userName}
            </FriendCell>
          </a>
        </Link>
      ))}
    </FriendContainer>
  );
};

ProfileFollowing.propTypes = {
  following: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProfileFollowing;
