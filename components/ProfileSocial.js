import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TelegramIcon from '../assets/telegram.svg';

const SocialContainer = styled.div`
  display: flex;
  align-items: center;

  a {
    color: ${(p) => p.theme.color.white};
  }
`;

const IconContainer = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  margin-right: ${(p) => p.theme.spacing.s2};
  filter: none;
`;

const ProfileSocial = ({ social }) => {
  if (!social.telegram) return null;
  const telegramLink = `https://t.me/${social.telegram}`;
  return (
    <SocialContainer>
      <IconContainer>
        <TelegramIcon stroke="#fff" />
      </IconContainer>
      <a href={telegramLink} target="_blank" rel="noopener noreferrer">
        {social.telegram}
      </a>
    </SocialContainer>
  );
};

ProfileSocial.propTypes = {
  social: PropTypes.objectOf(PropTypes.string),
};

ProfileSocial.defaultProps = {
  social: null,
};

export default ProfileSocial;
