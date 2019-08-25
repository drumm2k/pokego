import styled from 'styled-components';
import Link from 'next/link';
import Hamburger from './Hamburger';

const StyledHeader = styled.header`
  margin: 3rem 0;
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

const Nav = styled.ul`
  display: flex;
  font-size: 1.8rem;
  flex-wrap: wrap;
  color: #000;
  font-weight: 700;
`;

const NavItem = styled.li`
  margin-left: 2rem;
`;

const Header = () => (
  <StyledHeader>
    <Link href="/">
      <Logo>PokéGO</Logo>
    </Link>
    <Hamburger />
    {/* <Nav>
      <NavItem>
        <Link href="/events">Ивенты</Link>
      </NavItem>
      <NavItem>
        <Link href="/pokedex">Покедекс</Link>
      </NavItem>
    </Nav> */}
  </StyledHeader>
);

export default Header;
