import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div`
  background: url(${(props) => `/img/pokemon/${props.imgUrl}.png`}) 50% 50% no-repeat;
  background-size: cover;
  width: ${(props) => `${props.cardWidth}rem`};
  height: ${(props) => `${props.cardHeight}rem`};
  user-select: none;
  overflow: hidden;
`;

const PokeCard = (props) => {
  const { id, width, height, name } = props;
  return (
    <Card imgUrl={id} cardWidth={width} cardHeight={height}>
      {name ? <p>{name}</p> : null}
    </Card>
  );
};

PokeCard.propTypes = {
  id: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  name: PropTypes.string,
};

PokeCard.defaultProps = {
  width: 6.5,
  height: 6.5,
  name: '',
};

export default PokeCard;
