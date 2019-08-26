import React, { Component } from 'react';
import styled from 'styled-components';
import Clock from '../assets/clock.svg';

const StyledEvent = styled.div`
  display: flex;
  padding: 1.5rem;
  margin-bottom: 1rem;
  max-width: 400px;
  min-height: 8rem;
  border-radius: 15px;
  font-size: 1.4rem;
  color: #eee;
  background-image: linear-gradient(to right, #cc2b5e, #753a88);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const EventDataWrapper = styled.div`
  margin-left: 1rem;
`;

const EventTitle = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
`;

const EventDesc = styled.p`
  color: #dadada;
`;

const EventTimeWrapper = styled.div`
  display: flex;
  padding-top: 1rem;
  font-size: 1.6rem;
  color: #fcd768;
`;

const EventTime = styled.p`
  margin-left: 1rem;
`;

const StyledImg = styled.div`
  background: url(${props => props.imgUrl}) 50% 50% no-repeat;
  background-size: 10rem;
  min-width: 10rem;
  height: 10rem;
`;

class Event extends Component {
  render() {
    return (
      <StyledEvent>
        <StyledImg imgUrl={this.props.img} />
        <EventDataWrapper>
          <EventTitle>{this.props.name}</EventTitle>
          <EventDesc>{this.props.desc}</EventDesc>
          <EventTimeWrapper>
            <Clock />
            <EventTime>{this.props.timer}</EventTime>
          </EventTimeWrapper>
        </EventDataWrapper>
      </StyledEvent>
    );
  }
}

export default Event;
