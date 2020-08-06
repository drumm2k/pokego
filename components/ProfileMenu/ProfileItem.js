import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProfileLink = styled.a`
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

export default function ProfileItem(props) {
  const { children, url, as, leftIcon, rightIcon, open, setOpen } = props;

  return (
    <Link href={url} as={as} passHref>
      <ProfileLink onClick={() => setOpen(!open)} role="menuitem">
        {leftIcon && <ProfileItemLeftIcon>{leftIcon}</ProfileItemLeftIcon>}
        {children}
        {rightIcon && (
          <ProfileItemLinkRightIcon>{rightIcon}</ProfileItemLinkRightIcon>
        )}
      </ProfileLink>
    </Link>
  );
}

ProfileItem.propTypes = {
  children: PropTypes.string,
  url: PropTypes.string.isRequired,
  as: PropTypes.string,
  leftIcon: PropTypes.oneOfType([PropTypes.object]),
  rightIcon: PropTypes.oneOfType([PropTypes.object]),
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

ProfileItem.defaultProps = {
  as: null,
  children: null,
  leftIcon: null,
  rightIcon: null,
};
