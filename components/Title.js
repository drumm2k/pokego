import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTitle = styled.h1`
  font-size: 3.2rem;
  line-height: 4rem;
  color: ${(p) => (p.color ? p.color : p.theme.color.gray600)};
`;

const Title = ({ color, children }) => {
  return <StyledTitle color={color}>{children}</StyledTitle>;
};

Title.propTypes = {
  color: PropTypes.string,
  children: PropTypes.string,
};

Title.defaultProps = {
  color: '',
  children: '',
};

export default Title;
