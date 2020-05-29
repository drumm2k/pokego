import styled from 'styled-components';

const Card = styled.div`
  background: url(${(props) => '/img/pokemon/' + props.imgUrl + '.png'}) 50% 50%
    no-repeat;
  background-size: cover;
  width: ${(props) => props.cardWidth + 'rem'};
  height: ${(props) => props.cardHeight + 'rem'};
  user-select: none;
  overflow: hidden;
`;

const PokeCard = (props) => {
  return (
    <Card imgUrl={props.id} cardWidth={props.width} cardHeight={props.height}>
      {props.name ? <p>{props.name}</p> : null}
    </Card>
  );
};

export default PokeCard;
