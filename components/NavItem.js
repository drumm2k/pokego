import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

const StyledNavItem = styled.li`
  display: inline-block;
  border-bottom: 1px solid #eaeaea;
  height: 4.8rem;
  line-height: 4.8rem;
  margin: 0 1.6rem;

  &:last-child {
    border-bottom: none;
  }
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
