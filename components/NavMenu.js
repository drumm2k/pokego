import styled from 'styled-components';
import PropTypes from 'prop-types';
import Auth from './Auth';

const NavPanel = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
`;

const ButtonElem = styled.div`
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: #000;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.15s ease-in-out;

  &:nth-child(1) {
    top: 4px;
  }

  &:nth-child(2),
  :nth-child(3) {
    top: 14px;
  }

  &:nth-child(4) {
    top: 24px;
  }

  &.opened :nth-child(1) {
    top: 14px;
    width: 0%;
    left: 50%;
  }

  &.opened :nth-child(2) {
    transform: rotate(45deg);
  }

  &.opened :nth-child(3) {
    transform: rotate(-45deg);
  }

  &.opened :nth-child(4) {
    top: 14px;
    width: 0%;
    left: 50%;
  }
`;

function NavMenu(props) {
  const { navOpened, toggleNav } = props;
  return (
    <NavPanel>
      <Auth />
      <Button
        aria-label="Navigation Menu"
        aria-haspopup="true"
        aria-expanded={toggleNav}
        onClick={toggleNav}
      >
        <ButtonElem className={navOpened ? 'opened' : null} />
        <ButtonElem className={navOpened ? 'opened' : null} />
        <ButtonElem className={navOpened ? 'opened' : null} />
        <ButtonElem className={navOpened ? 'opened' : null} />
      </Button>
    </NavPanel>
  );
}

NavMenu.propTypes = {
  navOpened: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
};

export default NavMenu;
