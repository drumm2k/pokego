import { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import NavMenu from './NavMenu';
import NavList from './NavList';

const StyledHeader = styled.header`
  padding: 3rem 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => (props.navOpened ? '#fff' : 'none')};
  position: ${(props) => (props.navOpened ? 'fixed' : 'relative')};
  width: ${(props) => (props.navOpened ? 'calc(100% - 3rem);' : '100%')};
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1002;

  @media screen and (min-device-width: 768px) {
    max-width: 690px;
  }
`;

const Logo = styled.a`
  color: #000;
  font-size: 3.6rem;
  line-height: 1.125;
  font-weight: 700;
`;

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      navOpened: false,
    };

    Router.events.on('routeChangeComplete', (url) => {
      this.setState({ navOpened: false });
    });
  }

  toggleNav() {
    const { navOpened } = this.state;
    const currentState = navOpened;
    this.setState({ navOpened: !currentState });
  }

  render() {
    const { navOpened } = this.state;
    return (
      <>
        <StyledHeader navOpened={navOpened}>
          <Link href="/">
            <Logo>PokéGO</Logo>
          </Link>
          <NavMenu toggleNav={this.toggleNav} navOpened={navOpened} />
        </StyledHeader>
        <NavList navOpened={navOpened} />
      </>
    );
  }
}

export default Header;
