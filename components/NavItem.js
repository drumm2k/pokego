import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

const StyledNavItem = styled.li`
  padding-bottom: 1rem;
`;

const NavItem = (props) => {
  return (
    <StyledNavItem>
      <Link href={props.url}>
        <a>{props.name}</a>
      </Link>
    </StyledNavItem>
  );
};

NavItem.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
};

NavItem.defaultProps = {
  url: '/',
  name: '',
};

export default NavItem;
