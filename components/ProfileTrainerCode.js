import styled from 'styled-components';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

import ClipboardIcon from '../assets/clipboard.svg';

const TrainerCodeContainer = styled.div`
  color: ${(p) => p.theme.color.black};
  text-align: center;
  background: white;
  padding: ${(p) => p.theme.spacing.s4};
  border-radius: ${(p) => p.theme.border.radius300};
`;

const TrainerCode = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(p) => p.theme.font.size.xs};
  line-height: 2.4rem;
  letter-spacing: 1px;
  font-variant-numeric: tabular-nums;
`;

const CopyButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
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
      <QRCode value={trainerCode} renderAs="svg" size={128} />
      <TrainerCode>
        <span>{trainerCode}</span>
        <CopyButton onClick={copyTrainerCode} aria-label="Copy trainer code">
          <ClipboardIcon />
        </CopyButton>
      </TrainerCode>
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
