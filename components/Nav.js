import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

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

const NavItem = styled.li`
  padding-bottom: 1rem;
`;

class Nav extends Component {
  render() {
    return (
      <NavList className={this.props.navOpened ? 'opened' : null}>
        <NavItem>
          <Link href="/events">
            <a>Ивенты</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/tasks">
            <a>Задания</a>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/pokedex">
            <a>Покедекс</a>
          </Link>
        </NavItem>
      </NavList>
    );
  }
}

export default Nav;
