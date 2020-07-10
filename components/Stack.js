import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => !props.onlyBottom && `${props.gap}rem`};
  margin-bottom: ${(props) => !props.onlyTop && `${props.gap}rem`};
`;

const Stack = (props) => {
  const { children, gap, onlyBottom, onlyTop } = props;

  return (
    <Container gap={gap} onlyBottom={onlyBottom} onlyTop={onlyTop}>
      {children}
    </Container>
  );
};

Stack.propTypes = {
  gap: PropTypes.number,
  onlyBottom: PropTypes.bool,
  onlyTop: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

Stack.defaultProps = {
  gap: 3,
  onlyBottom: false,
  onlyTop: false,
};

export default Stack;
