import { gql, useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NavProfileButton = styled.button`
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

const NavItemLeftIcon = styled.span`
  margin-right: ${(p) => p.theme.spacing.s4};
  width: 2.4rem;
  height: 2.4rem;
`;

const NavItemLinkRightIcon = styled.span`
  margin-left: auto;
  width: 2.4rem;
  height: 2.4rem;
`;

export const LOGOUT = gql`
  mutation logout {
    logout
  }
`;

export default function NavProfileLogout(props) {
  const { children, leftIcon, rightIcon, open, setOpen, func } = props;

  const [logout, { client }] = useMutation(LOGOUT);

  return (
    <NavProfileButton
      onClick={async () => {
        setOpen(!open);
        await logout(); // Empty Refresh cookie
        await client.resetStore(); // Clear apollo client cache
        func(); // Clear Access token & user context
      }}
      role="menuitem"
    >
      {leftIcon && <NavItemLeftIcon>{leftIcon}</NavItemLeftIcon>}
      {children}
      {rightIcon && <NavItemLinkRightIcon>{rightIcon}</NavItemLinkRightIcon>}
    </NavProfileButton>
  );
}

NavProfileLogout.propTypes = {
  children: PropTypes.string,
  leftIcon: PropTypes.oneOfType([PropTypes.object]),
  rightIcon: PropTypes.oneOfType([PropTypes.object]),
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  func: PropTypes.func.isRequired,
};

NavProfileLogout.defaultProps = {
  children: null,
  leftIcon: null,
  rightIcon: null,
};