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
  margin-right: 1.5rem;
  overflow: hidden;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(50, 50, 50, 0.5);
    border-radius: 50%;
  }
`;

const ProfileAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background-color: rgb(245, 245, 245);
  transition: filter 0.3s;

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
  background-color: #fff;
  border: 1px solid rgb(245, 245, 245);
  box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
    0 18px 36px -18px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  padding: 1rem;
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
        leftIcon={<UserIcon stroke="rgb(90, 90, 90)" />}
        url="/login"
        open={open}
        setOpen={setOpen}
      >
        Войти
      </NavProfileItem>
      <NavProfileItem
        leftIcon={<SettingsIcon stroke="rgb(90, 90, 90)" />}
        url="/"
        open={open}
        setOpen={setOpen}
      >
        Настройки
      </NavProfileItem>
      <NavProfileItem
        leftIcon={<LogoutIcon stroke="rgb(90, 90, 90)" />}
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
