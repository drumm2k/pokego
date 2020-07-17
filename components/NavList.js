import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import NavItem from './NavItem';
import nav from '../config/nav.json';

const NavListContainer = styled.div`
  position: absolute;
  display: ${(p) => (p.open ? 'flex' : 'none')};
  top: 7.5rem;
  width: 100%;
  right: 0;
  z-index: 100;
  background: #fff;
  border: ${(p) => p.theme.borders.border100};
  border-radius: ${(p) => p.theme.borders.radius200};
  box-shadow: ${(p) => p.theme.lighting.shadow400};
  overflow: hidden;
`;

const StyledNavList = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: ${(p) => p.theme.sizing.s4};
  color: ${(p) => p.theme.colors.black};
  width: 100%;
`;

function NavList(props) {
  const { open, setOpen } = props;
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
    <NavListContainer open={open} ref={containerRef}>
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
