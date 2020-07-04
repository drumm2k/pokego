import styled from 'styled-components';
import PropTypes from 'prop-types';

const TrainerCodeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  margin-left: 0.5rem;
`;

const ProfileTrainerCode = ({ trainerCode }) => {
  if (!trainerCode) return null;

  return (
    <TrainerCodeContainer>
      <p>Код тренера: {trainerCode}</p>
      <IconContainer>
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="#4a5568"
        >
          <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      </IconContainer>
    </TrainerCodeContainer>
  );
};

ProfileTrainerCode.propTypes = {
  trainerCode: PropTypes.string,
};

ProfileTrainerCode.defaultProps = {
  trainerCode: null,
};

export default ProfileTrainerCode;
