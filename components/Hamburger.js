import React, { Component } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 30px;
  height: 30px;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  display: inline-block;

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

class Hamburger extends Component {
  render() {
    return (
      <Button
        aria-label="Navigation Menu"
        aria-haspopup="true"
        aria-expanded={this.props.toggleNav}
        onClick={this.props.toggleNav}
      >
        <ButtonElem className={this.props.navOpened ? 'opened' : null} />
        <ButtonElem className={this.props.navOpened ? 'opened' : null} />
        <ButtonElem className={this.props.navOpened ? 'opened' : null} />
        <ButtonElem className={this.props.navOpened ? 'opened' : null} />
      </Button>
    );
  }
}

export default Hamburger;
