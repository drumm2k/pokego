import { gql, useMutation } from '@apollo/client';
import styled from 'styled-components';

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

type ProfileLogoutProps = {
  children: string;
  leftIcon?: any;
  rightIcon?: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  func: () => void;
};

export default function ProfileLogout(props: ProfileLogoutProps) {
  const { children, leftIcon, rightIcon, open, setOpen, func } = props;

  const [logout, { client }] = useMutation(LOGOUT);

  return (
    <ProfileLogoutButton
      onClick={async () => {
        setOpen(!open);
        await logout(); // Empty Refresh cookie
        await client.resetStore(); // Clear apollo client cache
        func(); // Clear Access token & user context
      }}
      role="menuitem"
    >
      {leftIcon && <ProfileItemLeftIcon>{leftIcon}</ProfileItemLeftIcon>}
      {children}
      {rightIcon && <ProfileItemLinkRightIcon>{rightIcon}</ProfileItemLinkRightIcon>}
    </ProfileLogoutButton>
  );
}

const ProfileLogoutButton = styled.button`
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.color.black};
  height: 5rem;
  border-radius: 5px;
  padding: ${(p) => p.theme.spacing.s4};
  transition: background 0.25s;
  width: 100%;

  &:hover {
    background-color: ${(p) => p.theme.color.gray100};
  }
`;

const ProfileItemLeftIcon = styled.span`
  margin-right: ${(p) => p.theme.spacing.s4};
  width: 2.4rem;
  height: 2.4rem;
`;

const ProfileItemLinkRightIcon = styled.span`
  margin-left: auto;
  width: 2.4rem;
  height: 2.4rem;
`;
