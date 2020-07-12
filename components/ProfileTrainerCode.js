import { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ClipboardCopyIcon from '../assets/clipboard_copy.svg';

const TrainerCodeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CopyButton = styled.button`
  width: 2.3rem;
  height: 2.3rem;
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
    <TrainerCodeContainer>
      <p>
        Код тренера: <span>{trainerCode}</span>
      </p>
      <CopyButton onClick={copyTrainerCode}>
        <ClipboardCopyIcon stroke="rgb(90, 90, 90)" />
      </CopyButton>
    </TrainerCodeContainer>
  );
}

ProfileTrainerCode.propTypes = {
  trainerCode: PropTypes.string,
};

ProfileTrainerCode.defaultProps = {
  trainerCode: null,
};

export default ProfileTrainerCode;
