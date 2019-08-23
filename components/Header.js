import styled from 'styled-components';
import Link from 'next/link';

const StyledHeader = styled.header`
  margin: 1.5rem 0;
`;

const Logo = styled.a`
  color: #000;
  font-size: 4.8rem;
  line-height: 1.125;
  font-weight: 700;

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.7;
  }
`;

const Header = () => (
  <StyledHeader>
    <Link href="/">
      <Logo>PokeGO</Logo>
    </Link>
  </StyledHeader>
);

export default Header;
