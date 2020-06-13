import styled from 'styled-components';
import PropTypes from 'prop-types';
import checkName from '../lib/poke-name';

const Card = styled.div`
  max-width: 6.5rem;
  overflow: hidden;
  font-size: 1.2rem;
`;

const CardImg = styled.div.attrs((props) => ({
  style: {
    backgroundImage: props.imgUrl,
  },
}))`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  min-width: 6.5rem;
  min-height: 6.5rem;
  overflow: hidden;
`;

const CardContent = styled.div`
  text-align: center;
`;

const PokeCard = (props) => {
  const { id, name } = props;

  const filteredName = checkName(name)
    .toLowerCase()
    .replace(/^[^]/, (match) => match.toUpperCase());

  return (
    <Card>
      <CardImg imgUrl={`url(/img/pokemon/${id}.png)`}>#{id}</CardImg>
      <CardContent>
        <div>{filteredName}</div>
      </CardContent>
    </Card>
  );
};

PokeCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
};

PokeCard.defaultProps = {
  name: '',
};

export default PokeCard;
