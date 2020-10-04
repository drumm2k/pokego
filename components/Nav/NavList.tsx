import React from 'react';
import styled from 'styled-components';
import nav from 'config/nav.json';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { NavItem } from './NavItem';

interface NavListProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface NavItemProps {
  url: string;
  name: string;
}

export function NavList({ open, setOpen }: NavListProps) {
  const navListRef = React.createRef<any>();

  useOnClickOutside(navListRef, () => setOpen(false));

  return (
    <NavListContainer open={open} ref={navListRef}>
      <StyledNavList role="menu">
        {nav.menu.map((item: NavItemProps) => (
          <NavItem key={item.url} url={item.url} open={open} setOpen={setOpen}>
            {item.name}
          </NavItem>
        ))}
      </StyledNavList>
    </NavListContainer>
  );
}

const NavListContainer = styled.div<{ open: boolean }>`
  position: absolute;
  display: ${(p) => (p.open ? 'flex' : 'none')};
  top: 7.5rem;
  width: 100%;
  max-width: 450px;
  right: 0;
  z-index: 100;
  background: ${(p) => p.theme.color.white};
  border: ${(p) => p.theme.border.border100};
  border-radius: ${(p) => p.theme.border.radius200};
  box-shadow: ${(p) => p.theme.lighting.shadow400};
  overflow: hidden;
`;

const StyledNavList = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: ${(p) => p.theme.spacing.s4};
  color: ${(p) => p.theme.color.black};
  width: 100%;
`;
