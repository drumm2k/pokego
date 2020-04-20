import React, { Component } from 'react';
import styled from 'styled-components';

import NavItem from './NavItem';

const NavList = styled.ul`
  color: #000;
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
  display: none;
  flex-direction: column;

  &.opened {
    display: flex;
  }
`;

class Nav extends Component {
  render() {
    return (
      <NavList className={this.props.navOpened ? 'opened' : null}>
        <NavItem url={'/events'} name={'Ивенты'} />
        <NavItem url={'/tasks'} name={'Задания'} />
        <NavItem url={'/pokedex'} name={'Покедекс'} />
        <NavItem url={'/map'} name={'Карта'} />
      </NavList>
    );
  }
}

export default Nav;
