import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { useState } from 'react';
import styled from 'styled-components';
import ClipboardIcon from '../assets/clipboard.svg';

const TrainerCodeContainer = styled.div`
  color: ${(p) => p.theme.color.black};
  text-align: center;
  background: white;
  padding: ${(p) => p.theme.spacing.s4};
  border-radius: ${(p) => p.theme.border.radius300};
`;

const TrainerCode = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: ${(p) => p.theme.font.size.xs};
  line-height: 2.4rem;
  letter-spacing: 1px;
  font-variant-numeric: tabular-nums;
  min-width: 13rem;
`;

const CopyIcon = styled.div`
  width: 2.4rem;
  height: 2.4rem;
`;

function ProfileTrainerCode({ trainerCode }) {
  if (!trainerCode) return null;
  const [code, setCode] = useState(trainerCode);

  function copyTrainerCode() {
    const textField = document.createElement('textarea');
    textField.innerText = code;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    setCode('Скопировано');
    setTimeout(() => {
      setCode(trainerCode);
    }, 2000);
  }

  return (
    <TrainerCodeContainer>
      <QRCode value={trainerCode} renderAs="svg" size={128} />
      <TrainerCode onClick={copyTrainerCode} aria-label="Copy trainer code">
        {code}
        <CopyIcon>
          <ClipboardIcon />
        </CopyIcon>
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
