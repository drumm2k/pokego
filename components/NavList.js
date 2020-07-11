import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import NavItem from './NavItem';
import nav from '../data/nav.json';

const NavListContainer = styled.div`
  position: absolute;
  display: ${(props) => (props.open ? 'flex' : 'none')};
  top: 7.5rem;
  width: 100%;
  right: 0;
  z-index: 100;
  background: #fff;
  border: 1px solid rgb(245, 245, 245);
  border-radius: 5px;
  box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
    0 18px 36px -18px rgba(0, 0, 0, 0.3);
  overflow: hidden;
`;

const StyledNavList = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem;
  color: #000;
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
