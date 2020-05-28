import { Component } from 'react';
import styled from 'styled-components';

import NavItem from './NavItem';

const StyledNavList = styled.ul`
  font-size: 2.4rem;
  font-weight: 700;
  color: #000;
  background: #fff;
  position: fixed;
  text-align: center;
  display: none;
  flex-direction: column;
  width: 100%;
  top: 72px;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  z-index: 1001;

  @media screen and (min-device-width: 768px) {
    max-width: 720px;
  }

  &.opened {
    display: flex;
  }
`;

class NavList extends Component {
  render() {
    return (
      <StyledNavList
        role="menu"
        className={this.props.navOpened ? 'opened' : null}
      >
        <NavItem url={'/pokedex'} name={'Покедекс'} />
        <NavItem url={'/events'} name={'Ивенты'} />
        <NavItem url={'/raids'} name={'Рейды'} />
        <NavItem url={'/tasks'} name={'Задания'} />
        <NavItem url={'/map'} name={'Карта'} />
      </StyledNavList>
    );
  }
}

export default NavList;
