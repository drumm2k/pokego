import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div`
  /* background: url(${(props) =>
    `/img/pokemon/${props.imgUrl}.png`}) 50% 50% no-repeat;
  background-size: cover; */
  min-width: 6.5rem;
  min-height: 6.5rem;
  overflow: hidden;
`;

const CardContent = styled.div`
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
`;

const PokeCard = (props) => {
  const { id, width, height, name, imgUrl } = props;
  return (
    <Card imgUrl={id}>
      <img src={imgUrl} alt={id} width={width} height={height} />
      <CardContent>
        <div>Name</div>
        <div>{id}</div>
      </CardContent>
    </Card>
  );
};

PokeCard.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  name: PropTypes.string,
};

PokeCard.defaultProps = {
  width: `65px`,
  height: `65px`,
  name: '',
};

export default PokeCard;
