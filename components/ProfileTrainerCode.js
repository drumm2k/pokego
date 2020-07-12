import styled from 'styled-components';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

import ClipboardIcon from '../assets/clipboard.svg';

const TrainerCodeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CopyButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  margin-left: 0.5rem;
`;

function ProfileTrainerCode({ trainerCode }) {
  if (!trainerCode) return null;

  function copyTrainerCode() {
    const textField = document.createElement('textarea');
    textField.innerText = trainerCode;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  }

  return (
    <>
      <QRCode value={trainerCode} renderAs="svg" size={128} />
      <TrainerCodeContainer>
        <p>
          Код тренера: <span>{trainerCode}</span>
        </p>
        <CopyButton>
          <ClipboardIcon onClick={copyTrainerCode} />
        </CopyButton>
      </TrainerCodeContainer>
    </>
  );
}

ProfileTrainerCode.propTypes = {
  trainerCode: PropTypes.string,
};

ProfileTrainerCode.defaultProps = {
  trainerCode: null,
};

export default ProfileTrainerCode;
