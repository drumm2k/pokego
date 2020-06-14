import styled from 'styled-components';
import PropTypes from 'prop-types';
import checkName from '../lib/poke-name';

const Card = styled.div`
  max-width: 7.2rem;
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
  min-width: 7.2rem;
  min-height: 7.2rem;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
`;

const CardContent = styled.div`
  text-align: center;
`;

const PokeCard = (props) => {
  const { id, name, gen } = props;

  const filteredName = checkName(name)
    .toLowerCase()
    .replace(/^[^]/, (match) => match.toUpperCase());

  const generation = gen && gen.split('_')[1].replace(/^/, 'G');

  return (
    <Card>
      <CardImg imgUrl={`url(/img/pokemon/${id}.png)`}>
        <div>#{id}</div>
        <div>{generation}</div>
      </CardImg>
      <CardContent>
        <div>{filteredName}</div>
      </CardContent>
    </Card>
  );
};

PokeCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  gen: PropTypes.string,
};

PokeCard.defaultProps = {
  name: '',
  gen: '',
};

export default PokeCard;
