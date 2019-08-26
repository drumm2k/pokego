import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';

const NavList = styled.ul`
  color: #000;
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to top, #ddd 0%, #fff 100%);
  padding: 15rem 0;
  transition: opacity 0.25s, left 0s 0s;
`;

const NavItem = styled.li`
  padding-bottom: 1rem;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  display: inline-block;
  z-index: 1;

  &:focus {
    outline: none;
  }
`;

const ButtonElem = styled.span`
  display: block;
  position: absolute;
  height: 4px;
  width: 100%;
  background: #000;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.15s ease-in-out;
  -moz-transition: 0.15s ease-in-out;
  -o-transition: 0.15s ease-in-out;
  transition: 0.15s ease-in-out;

  &:nth-child(1) {
    top: 0px;
  }

  &:nth-child(2),
  :nth-child(3) {
    top: 10px;
  }

  &:nth-child(4) {
    top: 20px;
  }

  &.opened :nth-child(1) {
    top: 10px;
    width: 0%;
    left: 50%;
  }

  &.opened :nth-child(2) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  &.opened :nth-child(3) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  &.opened :nth-child(4) {
    top: 10px;
    width: 0%;
    left: 50%;
  }
`;

class MobileNav extends Component {
  constructor(props) {
    super(props);
    this.toggleState = this.toggleState.bind(this);
    this.state = {
      opened: false
    };

    Router.events.on('routeChangeComplete', url => {
      this.setState({ opened: false });
    });
  }

  toggleState() {
    const currentState = this.state.opened;
    this.setState({ opened: !currentState });
  }

  render() {
    const opened = this.state.opened;
    let menu;

    if (opened) {
      menu = (
        <NavList>
          <NavItem>
            <Link href="/events" onClick={this.toggleState}>
              <a>Ивенты</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/tasks" onClick={this.toggleState}>
              <a>Задания</a>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/pokedex" onClick={this.toggleState}>
              <a>Покедекс</a>
            </Link>
          </NavItem>
        </NavList>
      );
    }

    return (
      <div>
        {menu}
        <Button onClick={this.toggleState}>
          <ButtonElem className={this.state.opened ? 'opened' : null} />
          <ButtonElem className={this.state.opened ? 'opened' : null} />
          <ButtonElem className={this.state.opened ? 'opened' : null} />
          <ButtonElem className={this.state.opened ? 'opened' : null} />
        </Button>
      </div>
    );
  }
}

export default MobileNav;
