import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

const NavItemLink = styled.a`
  display: inline-block;
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

const NavItem = (props) => {
  const { url, children, open, setOpen } = props;

  return (
    <Link href={url} passHref>
      <NavItemLink role="menuitem" onClick={() => setOpen(!open)}>
        {children}
      </NavItemLink>
    </Link>
  );
};

NavItem.propTypes = {
  url: PropTypes.string,
  children: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

NavItem.defaultProps = {
  url: '/',
};

export default NavItem;
