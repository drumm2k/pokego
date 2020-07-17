import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import NavProfileItem from './NavProfileItem';

import UserIcon from '../assets/user.svg';
import SettingsIcon from '../assets/cog.svg';
import LogoutIcon from '../assets/logout.svg';

const ProfileButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${(p) => p.theme.spacing.s6};
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

export default function NavProfile({ icon }) {
  const [open, setOpen] = useState(false);

  return (
    <>
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
      {open && <DropdownMenu open={open} setOpen={setOpen} />}
    </>
  );
}

function DropdownMenu({ open, setOpen }) {
  const containerRef = React.createRef();

  // useEffect to close Dropdown when something clicked outside
  useEffect(() => {
    const handleClick = (event) => {
      let current = event.target;
      while (current !== null) {
        if (current === containerRef.current) {
          return;
        }
        current = current.parentNode;
      }
      setOpen(!open);
    };

    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <Dropdown ref={containerRef}>
      <NavProfileItem
        leftIcon={<UserIcon />}
        url="/login"
        open={open}
        setOpen={setOpen}
      >
        Войти
      </NavProfileItem>
      <NavProfileItem
        leftIcon={<SettingsIcon />}
        url="/"
        open={open}
        setOpen={setOpen}
      >
        Настройки
      </NavProfileItem>
      <NavProfileItem
        leftIcon={<LogoutIcon />}
        url="/"
        open={open}
        setOpen={setOpen}
      >
        Выйти
      </NavProfileItem>
    </Dropdown>
  );
}

NavProfile.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object]),
};

NavProfile.defaultProps = {
  icon: null,
};

DropdownMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
