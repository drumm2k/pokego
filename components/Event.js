import PropTypes from 'prop-types';
import styled from 'styled-components';
import EventTimer from './EventTimer';
import ChevronRightIcon from '../assets/chevron_right.svg';
import Stack from './Stack';

const EventCard = styled.div`
  display: flex;
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgb(216, 216, 220);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s;
  }
`;

const EventData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
`;

const EventTitle = styled.h4`
  color: #000;
`;

const EventDesc = styled.p`
  font-size: 1.4rem;
  color: #4a5568;
  padding-bottom: 0.5rem;
`;

const EventImg = styled.div`
  background: url(${(props) => props.imgUrl}) 50% 50% no-repeat;
  background-size: cover;
  min-width: 12rem;
  min-height: 10rem;

  @media screen and (min-width: 768px) {
    min-width: 24rem;
    min-height: 12rem;
  }
`;

const EventArrow = styled.div`
  align-self: center;
  margin-left: auto;
  margin-right: 0.5rem;
  min-width: 2rem;
  width: 2rem;
`;

function Event({ img, name, description, starts, ends }) {
  return (
    <Stack gap={1}>
      <EventCard>
        <EventImg imgUrl={img} alt={name} />
        <EventData>
          <div>
            <EventTitle>{name}</EventTitle>
            <EventDesc>{description}</EventDesc>
          </div>
          <EventTimer start={starts} end={ends} />
        </EventData>
        <EventArrow>
          <ChevronRightIcon stroke="rgb(90, 90, 90)" />
        </EventArrow>
      </EventCard>
    </Stack>
  );
}

Event.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  starts: PropTypes.string.isRequired,
  ends: PropTypes.string.isRequired,
};

export default Event;
