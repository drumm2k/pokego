import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import nav from '../../config/nav.json';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import NavItem from './NavItem';

const NavListContainer = styled.div`
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

function NavList(props) {
  const { open, setOpen } = props;
  const navListRef = React.createRef();

  useOnClickOutside(navListRef, () => setOpen(false));

  return (
    <NavListContainer open={open} ref={navListRef}>
      <StyledNavList role="menu">
        {nav.menu.map((item) => (
          <NavItem key={item.url} url={item.url} open={open} setOpen={setOpen}>
            {item.name}
          </NavItem>
        ))}
      </StyledNavList>
    </NavListContainer>
  );
}

NavList.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default NavList;
