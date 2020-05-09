import { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import EventTimer from './EventTimer';
import ArrowIcon from '../assets/arrow.svg';

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
  display: grid;
  grid-template-columns: 9.6rem auto;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  padding: 1.5rem 1rem;
  border-radius: 15px;
  background-image: linear-gradient(to right, #cc2b5e, #753a88);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  /* background: #aa306f; */
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

const EventImg = styled.div`
  background: url(${(props) => props.imgUrl}) 50% 50% no-repeat;
  background-size: cover;
  width: 9.6rem;
  height: 9.6rem;
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EventStatus = styled.span`
  display: inline-block;
  padding: 0.1rem 0.7rem;
  color: #753a88;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  background-color: #fcd768;
  border-radius: 15px;
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
  static propTypes = {
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
  };

  static defaultProps = {
    img: '',
    name: '???',
    desc: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      status: '',
    };
    this.statusHandler = this.statusHandler.bind(this);
  }

  statusHandler(status) {
    this.setState({ status: status });
  }

  render() {
    return (
      <StyledEvent>
        <EventCard>
          <EventImg imgUrl={this.props.img} />
          <div>
            <EventTitle>{this.props.name}</EventTitle>
            <EventDesc>{this.props.desc}</EventDesc>
          </div>
          <StatusContainer>
            <EventStatus>{this.state.status}</EventStatus>
          </StatusContainer>
          <EventTimer
            start={this.props.start}
            end={this.props.end}
            status={this.props.status}
            statusHandler={this.statusHandler}
          />
        </EventCard>
        {/* <Unfold>
          <ArrowIcon />
        </Unfold> */}
      </StyledEvent>
    );
  }
}

export default Event;
