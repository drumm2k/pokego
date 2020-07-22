import styled from 'styled-components';
import Link from 'next/link';
import NavProfile from './NavProfile';
import NavMenu from './NavMenu';
import PlusIcon from '../assets/plus.svg';

const StyledHeader = styled.header`
  position: relative;
  padding: ${(p) => p.theme.spacing.s12} 0 ${(p) => p.theme.spacing.s6};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled.a`
  color: ${(p) => p.theme.color.black};
  font-size: 3.6rem;
  line-height: 1.125;
  font-weight: ${(p) => p.theme.font.weight.bold};
`;

const NavPanel = styled.nav`
  display: flex;
  align-items: center;

  a {
    margin-right: ${(p) => p.theme.spacing.s4};
  }
`;

export default function Header() {
  return (
    <>
      <StyledHeader>
        <Link href="/">
          <Logo>PokéGO</Logo>
        </Link>
        <NavPanel>
          <NavProfile icon={<PlusIcon />} />
          <NavMenu />
        </NavPanel>
      </StyledHeader>
    </>
  );
}
