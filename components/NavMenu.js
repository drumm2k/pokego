import { useState } from 'react';
import styled from 'styled-components';
import NavList from './NavList';
import MenuIcon from '../assets/menu.svg';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.8rem;
  height: 3.2rem;
  background-color: rgb(245, 245, 245);
  border-radius: 16px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(50, 50, 50, 0.5);
    border-radius: 16px;
  }

  &:hover {
    filter: brightness(0.9);
  }
`;

export default function NavMenu() {
  const [open, setOpen] = useState();

  return (
    <>
      <Button
        aria-label="Navigation Menu"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <MenuIcon />
      </Button>
      {open && <NavList open={open} setOpen={setOpen} />}
    </>
  );
}
