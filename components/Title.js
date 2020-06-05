import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTitle = styled.h2`
  color: ${(props) => props.color};
  margin-bottom: 1.5rem;
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