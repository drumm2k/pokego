import styled from 'styled-components';
import PropTypes from 'prop-types';
import ClipboardCoryIcon from '../assets/clipboard_copy.svg';

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
        <ClipboardCoryIcon stroke="rgb(90, 90, 90)" />
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
