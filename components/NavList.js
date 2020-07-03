import styled from 'styled-components';
import PropTypes from 'prop-types';
import NavItem from './NavItem';

const StyledNavList = styled.ul`
  font-size: 2.4rem;
  font-weight: 700;
  color: #000;
  background: #fff;
  position: fixed;
  text-align: center;
  display: none;
  flex-direction: column;
  width: 100%;
  top: 72px;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  z-index: 1003;

  @media screen and (min-device-width: 768px) {
    max-width: 720px;
  }

  &.opened {
    display: flex;
  }
`;

function NavList(props) {
  const { navOpened } = props;

  return (
    <StyledNavList role="menu" className={navOpened ? 'opened' : null}>
      <NavItem url="/pokedex" name="Покедекс" />
      <NavItem url="/events" name="Ивенты" />
      <NavItem url="/raids" name="Рейды" />
      {/* <NavItem url="/tasks" name="Задания" /> */}
      <NavItem url="/map" name="Карта" />
    </StyledNavList>
  );
}

NavList.propTypes = {
  navOpened: PropTypes.bool.isRequired,
};

export default NavList;
