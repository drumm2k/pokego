import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TelegramIcon from '../assets/telegram.svg';

const SocialContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  margin-right: ${(p) => p.theme.spacing.s2};
`;

const ProfileSocial = ({ telegram }) => {
  if (!telegram) return null;
  const telegramLink = `https://t.me/${telegram}`;
  return (
    <SocialContainer>
      <IconContainer>
        <TelegramIcon />
      </IconContainer>
      <a href={telegramLink} target="_blank" rel="noopener noreferrer">
        {telegram}
      </a>
    </SocialContainer>
  );
};

ProfileSocial.propTypes = {
  telegram: PropTypes.string,
};

ProfileSocial.defaultProps = {
  telegram: null,
};

export default ProfileSocial;
