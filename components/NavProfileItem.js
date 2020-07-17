import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';

const NavProfileLink = styled.a`
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.color.black};
  height: 5rem;
  border-radius: 5px;
  padding: ${(p) => p.theme.spacing.s4};
  transition: background 0.25s;

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

export default function NavProfileItem(props) {
  const { children, url, leftIcon, rightIcon, open, setOpen } = props;

  return (
    <Link href={url} passHref>
      <NavProfileLink onClick={() => setOpen(!open)} role="menuitem">
        {leftIcon && <NavItemLeftIcon>{leftIcon}</NavItemLeftIcon>}
        {children}
        {rightIcon && <NavItemLinkRightIcon>{rightIcon}</NavItemLinkRightIcon>}
      </NavProfileLink>
    </Link>
  );
}

NavProfileItem.propTypes = {
  children: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  leftIcon: PropTypes.oneOfType([PropTypes.object]),
  rightIcon: PropTypes.oneOfType([PropTypes.object]),
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

NavProfileItem.defaultProps = {
  leftIcon: null,
  rightIcon: null,
};
