import styled from 'styled-components';

const Card = styled.div`
  background: url(${(props) => '/img/pokemon/' + props.imgUrl + '.png'}) 50% 50%
    no-repeat;
  background-size: cover;
  width: ${(props) => props.cardWidth + 'rem'};
  height: ${(props) => props.cardHeight + 'rem'};
  user-select: none;
`;

const PokeCard = (props) => {
  return (
    <Card imgUrl={props.id} cardWidth={props.width} cardHeight={props.height}>
      <p>{props.id}</p>
    </Card>
  );
};

export default PokeCard;
