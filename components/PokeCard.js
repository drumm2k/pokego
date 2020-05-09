import styled from 'styled-components';
import { func } from 'prop-types';

const Card = styled.div`
  background: url(${(props) => '/img/pokemon/' + props.imgUrl + '.png'}) 50% 50%
    no-repeat;
  background-size: cover;
  width: ${(props) => props.cardWidth + 'rem'};
  height: ${(props) => props.cardHeight + 'rem'};
`;

function selectCard() {
  console.log('Select');
}

const PokeCard = (props) => {
  return (
    <Card
      imgUrl={props.id}
      cardWidth={props.width}
      cardHeight={props.height}
      onClick={selectCard}
    >
      <p>{props.id}</p>
    </Card>
  );
};

export default PokeCard;
