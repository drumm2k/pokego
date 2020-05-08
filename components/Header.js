import { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import NavMenu from './NavMenu';
import Nav from './Nav';

const StyledHeader = styled.header`
  margin: 3rem 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    const currentState = this.state.navOpened;
    this.setState({ navOpened: !currentState });
  }

  render() {
    return (
      <div>
        <StyledHeader>
          <Link href="/">
            <Logo>PokéGO</Logo>
          </Link>
          <NavMenu
            toggleNav={this.toggleNav}
            navOpened={this.state.navOpened}
          />
        </StyledHeader>
        <Nav navOpened={this.state.navOpened} />
      </div>
    );
  }
}

export default Header;
