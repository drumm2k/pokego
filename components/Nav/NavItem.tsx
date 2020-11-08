import Link from 'next/link';
import styled from 'styled-components';

interface NavItemProps {
  url: string;
  children: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function NavItem({ url, children, open, setOpen }: NavItemProps) {
  return (
    <Link href={url} passHref>
      <NavItemLink role="menuitem" onClick={() => setOpen(!open)}>
        {children}
      </NavItemLink>
    </Link>
  );
}

const NavItemLink = styled.a`
  display: inline-block;
  color: ${(p) => p.theme.color.black};
  font-size: ${(p) => p.theme.font.size.lg};
  font-weight: ${(p) => p.theme.font.weight.bold};
  text-align: center;
  border-radius: ${(p) => p.theme.border.radius200};
  height: 5rem;
  line-height: 5rem;
  transition: background 0.25s;

  &:hover {
    background-color: ${(p) => p.theme.color.gray100};
  }

  &:last-child {
    border-bottom: none;
  }
`;
