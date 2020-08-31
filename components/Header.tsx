import PlusIcon from 'assets/plus.svg';
import NavMenu from 'components/Nav/NavMenu';
import { ProfileMenu } from 'components/ProfileMenu/ProfileMenu';
import Link from 'next/link';
import styled from 'styled-components';

export default function Header() {
  return (
    <StyledHeader>
      <Link href="/" passHref>
        <Logo>PokéGO</Logo>
      </Link>
      <NavPanel>
        <ProfileMenu icon={<PlusIcon />} />
        <NavMenu />
      </NavPanel>
    </StyledHeader>
  );
}

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
`;
