import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Clock from '../assets/clock.svg';
import Arrow from '../assets/arrow.svg';

const StyledEvent = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  max-width: 40rem;
  border-radius: 15px;
  font-size: 1.4rem;
  color: #eee;
`;

const EventCard = styled.div`
  display: flex;
  padding: 1.5rem 1rem;
  border-radius: 15px;
  background-image: linear-gradient(to right, #cc2b5e, #753a88);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  /* background: #aa306f; */
`;

const EventDataWrapper = styled.div`
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const EventTitle = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  color: #fcd768;
`;

const EventDesc = styled.p`
  color: #e5b8d0;
  flex-grow: 1;
`;

const EventTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  font-size: 1.6rem;
  color: #fcd768;
`;

const EventTimer = styled.p`
  margin-left: 1rem;
`;

const EventImg = styled.div`
  background: url(${props => props.imgUrl}) 50% 50% no-repeat;
  background-size: 10rem;
  min-width: 10rem;
  height: 10rem;
`;

const Unfold = styled.div`
  text-align: center;
  align-self: center;
  width: 7rem;
  height: 2rem;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background: #901d58;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

class Event extends Component {
  render() {
    return (
      <StyledEvent>
        <EventCard>
          <EventImg imgUrl={this.props.img} />
          <EventDataWrapper>
            <EventTitle>{this.props.name}</EventTitle>
            <EventDesc>{this.props.desc}</EventDesc>
            <EventTimeWrapper>
              <Clock />
              <EventTimer>{this.props.timer}</EventTimer>
            </EventTimeWrapper>
          </EventDataWrapper>
        </EventCard>
        <Unfold>
          <Arrow />
        </Unfold>
      </StyledEvent>
    );
  }
}

Event.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  desc: PropTypes.string,
  timer: PropTypes.string
};

export default Event;
