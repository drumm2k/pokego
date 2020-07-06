import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PropTypes from 'prop-types';
import UserIcon from '../assets/user.svg';
import SettingsIcon from '../assets/cog.svg';
import LogoutIcon from '../assets/logout.svg';

const ProfileButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2rem;
  overflow: hidden;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(150, 150, 150, 0.5);
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
  border: 1px solid rgb(220, 220, 220);
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
  top: 72px;
  width: 17.5rem;
  transform: translateX(-65%);
  background-color: rgb(245, 245, 245);
  border: 1px solid rgb(220, 220, 220);
  border-radius: 5px;
  padding: 1rem;
  overflow: hidden;
`;

const DropdownLink = styled.a`
  display: flex;
  align-items: center;
  height: 5rem;
  border-radius: 5px;
  padding: 1rem;
  transition: background 0.3s;

  &:hover {
    background-color: rgb(220, 220, 220);
  }
`;

const DropdownLinkLeftIcon = styled.span`
  margin-right: 1rem;
  width: 2.4rem;
  height: 2.4rem;
`;

const DropdownLinkRightIcon = styled.span`
  margin-left: auto;
  width: 2.4rem;
  height: 2.4rem;
`;

export default function NavProfile({ icon }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ProfileButton onClick={() => setOpen(!open)}>
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
      <DropdownItem
        leftIcon={<UserIcon />}
        url="/login"
        open={open}
        setOpen={setOpen}
      >
        Войти
      </DropdownItem>
      <DropdownItem
        leftIcon={<SettingsIcon />}
        url="/"
        open={open}
        setOpen={setOpen}
      >
        Настройки
      </DropdownItem>
      <DropdownItem leftIcon={<LogoutIcon />} url="/" open={open} setOpen={setOpen}>
        Выйти
      </DropdownItem>
    </Dropdown>
  );
}

function DropdownItem(props) {
  const { children, url, leftIcon, rightIcon, open, setOpen } = props;

  return (
    <Link href={url} passHref>
      <DropdownLink onClick={() => setOpen(!open)}>
        {leftIcon && <DropdownLinkLeftIcon>{leftIcon}</DropdownLinkLeftIcon>}
        {children}
        {rightIcon && <DropdownLinkRightIcon>{rightIcon}</DropdownLinkRightIcon>}
      </DropdownLink>
    </Link>
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

DropdownItem.propTypes = {
  children: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  leftIcon: PropTypes.oneOfType([PropTypes.object]),
  rightIcon: PropTypes.oneOfType([PropTypes.object]),
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

DropdownItem.defaultProps = {
  leftIcon: null,
  rightIcon: null,
};
