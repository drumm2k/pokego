import SettingsIcon from 'assets/cog.svg';
import LogoutIcon from 'assets/logout.svg';
import UserIcon from 'assets/user.svg';
import AuthContext, { UserDataType } from 'context/auth';
import useOnClickOutside from 'hooks/useOnClickOutside';
import jwtDecode from 'jwt-decode';
import { getAccessToken } from 'lib/accessToken';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileItem from './ProfileItem';
import ProfileLogout from './ProfileLogout';

export function ProfileMenu({ icon }: { icon: JSX.Element }) {
  const [open, setOpen] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!getAccessToken()) {
      return;
    }

    const payload = jwtDecode(getAccessToken());
    auth.login(payload as UserDataType);
  }, [getAccessToken()]);

  return (
    <>
      {auth.user && (
        <>
          <Link href="/user/[id]" as={`/user/${auth.user.userName}`} passHref>
            <UserName>{auth.user.userName}</UserName>
          </Link>
          <ProfileButton
            onClick={() => setOpen(!open)}
            aria-label="Profile Menu"
            aria-haspopup="true"
            aria-expanded={open}
          >
            <ProfileAvatar>
              <ProfileAvatarIcon>{icon}</ProfileAvatarIcon>
            </ProfileAvatar>
          </ProfileButton>
        </>
      )}
      {!auth.user && (
        <Link href="/login" passHref>
          <Login>Войти</Login>
        </Link>
      )}
      {open && <DropdownMenu open={open} setOpen={setOpen} />}
    </>
  );
}

type DropdownMenuProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DropdownMenu({ open, setOpen }: DropdownMenuProps) {
  const dropdownRef = React.createRef<any>();
  const auth = useContext<any>(AuthContext);
  useOnClickOutside(dropdownRef, () => setOpen(false));

  return (
    <Dropdown ref={dropdownRef}>
      <ProfileItem
        leftIcon={<UserIcon />}
        url="/user/[id]"
        as={`/user/${auth.user.userName}`}
        open={open}
        setOpen={setOpen}
      >
        Профиль
      </ProfileItem>
      <ProfileItem
        leftIcon={<SettingsIcon />}
        url="/settings"
        open={open}
        setOpen={setOpen}
      >
        Настройки
      </ProfileItem>
      <ProfileLogout
        leftIcon={<LogoutIcon />}
        func={auth.logout}
        open={open}
        setOpen={setOpen}
      >
        Выйти
      </ProfileLogout>
    </Dropdown>
  );
}

const ProfileButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 ${(p) => p.theme.spacing.s6};
  overflow: hidden;
  border-radius: 50%;

  &:focus {
    outline: none;
    box-shadow: ${(p) => p.theme.input.focus};
  }
`;

const ProfileAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background-color: ${(p) => p.theme.color.gray100};
  transition: filter 0.25s;

  &:hover {
    filter: brightness(0.9);
  }
`;

const ProfileAvatarIcon = styled.div`
  width: 2rem;
  height: 2rem;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 7.5rem;
  width: 17.5rem;
  right: 5rem;
  background-color: ${(p) => p.theme.color.white};
  border: ${(p) => p.theme.border.border100};
  box-shadow: ${(p) => p.theme.lighting.shadow400};
  border-radius: ${(p) => p.theme.border.radius200};
  padding: ${(p) => p.theme.spacing.s4};
  overflow: hidden;
  z-index: 50;
`;

const Login = styled.a`
  color: ${(p) => p.theme.color.gray600};
  letter-spacing: 0.1rem;
  padding: ${(p) => p.theme.spacing.s2} ${(p) => p.theme.spacing.s4};
  margin: 0 ${(p) => p.theme.spacing.s4};
  border: ${(p) => p.theme.border.border300};
  border-radius: ${(p) => p.theme.border.radius200};
  transition: all 0.25s ease 0s;

  &:hover {
    border-color: ${(p) => p.theme.color.black};
    background-color: transparent;
    color: ${(p) => p.theme.color.black};
    cursor: pointer;
  }
`;

const UserName = styled.a`
  color: ${(p) => p.theme.color.gray600};

  &:hover {
    border-color: ${(p) => p.theme.color.black};
    background-color: transparent;
    color: ${(p) => p.theme.color.black};
  }
`;

ProfileMenu.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object]),
};

ProfileMenu.defaultProps = {
  icon: null,
};

DropdownMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
