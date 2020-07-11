import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

const NavItemLink = styled.a`
  display: inline-block;
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
  border-radius: 5px;
  height: 5rem;
  line-height: 5rem;
  transition: background 0.3s;

  &:hover {
    background-color: rgb(240, 240, 240);
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
