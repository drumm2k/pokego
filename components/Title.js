import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTitle = styled.h1`
  font-size: 3.2rem;
  line-height: 4rem;
  color: ${(props) => props.color};
`;

const Title = (props) => {
  const { color, children } = props;

  return <StyledTitle color={color}>{children}</StyledTitle>;
};

Title.propTypes = {
  color: PropTypes.string,
  children: PropTypes.string,
};

Title.defaultProps = {
  color: '#000',
  children: '',
};

export default Title;
