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
  background-color: ${(p) => p.theme.color.gray100};
  border-radius: ${(p) => p.theme.border.radius500};
  transition: filter 0.25s;

  &:focus {
    outline: none;
    box-shadow: ${(p) => p.theme.input.focus};
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
