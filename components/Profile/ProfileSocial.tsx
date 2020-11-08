import TelegramIcon from 'assets/telegram.svg';
import styled from 'styled-components';

interface SocialProp {
  telegram?: string;
  discord?: string;
}

interface ProfileSocialProps {
  social: SocialProp;
}

export function ProfileSocial({ social }: ProfileSocialProps): JSX.Element | null {
  if (!social.telegram) return null;
  const telegramLink = `https://t.me/${social.telegram}`;
  // ADD DISCORD LATER
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
}

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
