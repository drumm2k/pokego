import styled from 'styled-components';
import Link from 'next/link';
import MobileNav from './MobileNav';

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
  z-index: 1;
`;

const Header = () => (
  <StyledHeader>
    <Link href="/">
      <Logo>PokéGO</Logo>
    </Link>
    <MobileNav />
  </StyledHeader>
);

export default Header;
