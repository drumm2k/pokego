import React, { Component } from 'react';
import styled from 'styled-components';

const Menu = styled.div`
  width: 30px;
  height: 25px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;
`;

const Bar = styled.span`
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
  constructor(props) {
    super(props);
    this.toggleState = this.toggleState.bind(this);
    this.state = {
      opened: false
    };
  }

  toggleState() {
    const currentState = this.state.opened;
    this.setState({ opened: !currentState });
  }

  render() {
    return (
      <div>
        <Menu onClick={this.toggleState}>
          <Bar className={this.state.opened ? 'opened' : null} />
          <Bar className={this.state.opened ? 'opened' : null} />
          <Bar className={this.state.opened ? 'opened' : null} />
          <Bar className={this.state.opened ? 'opened' : null} />
        </Menu>
      </div>
    );
  }
}

export default Hamburger;
