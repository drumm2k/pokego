import PropTypes from 'prop-types';
import styled from 'styled-components';
import EventTimer from './EventTimer';

const EventCard = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgb(216, 216, 220);
  overflow: hidden;
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

  @media (min-width: 768px) {
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
    <>
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
          <svg
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="#4a5568"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </EventArrow>
      </EventCard>
    </>
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
