import styled from 'styled-components';
import Link from 'next/link';
import NavProfile from './NavProfile';
import NavMenu from './NavMenu';
import PlusIcon from '../assets/plus.svg';

const StyledHeader = styled.header`
  position: relative;
  padding: 3rem 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled.a`
  color: #000;
  font-size: 3.6rem;
  line-height: 1.125;
  font-weight: 700;
`;

const NavPanel = styled.nav`
  display: flex;
  align-items: center;
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
