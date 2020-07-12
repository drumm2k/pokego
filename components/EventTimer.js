import { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ClockIcon from '../assets/clock.svg';

const EventTimerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ClockContainer = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  width: 20px;
`;

const EventTimerOutput = styled.p`
  font-size: 1.4rem;
  letter-spacing: 1px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  margin-left: 1rem;
`;

class EventTimer extends Component {
  constructor(props) {
    super(props);
    const { start, end } = this.props;
    this.state = {
      start,
      end,
      output: '',
    };
  }

  componentDidMount() {
    this.tick();
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  calcDuration = (date) => {
    const milliseconds = Date.parse(date) - Date.parse(new Date());
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;
    let hours = Math.floor(minutes / 60);
    minutes %= 60;
    const days = Math.floor(hours / 24);
    hours %= 24;

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }

    if (days === 0 && hours === 0 && minutes === 0) {
      this.setState({
        output: `${seconds}с`,
      });
    } else if (days === 0 && hours === 0) {
      this.setState({
        output: `${minutes}м ${seconds}с`,
      });
    } else if (days === 0) {
      this.setState({
        output: `${hours}ч ${minutes}м ${seconds}с`,
      });
    } else {
      this.setState({
        output: `${days}д ${hours}ч ${minutes}м ${seconds}с`,
      });
    }
  };

  tick() {
    const { start, end } = this.state;
    const diffStart = Date.parse(start) - Date.parse(new Date());
    const diffEnd = Date.parse(end) - Date.parse(new Date());
    if (diffStart > 0) {
      this.calcDuration(start);
    } else if (diffStart < 0 && diffEnd > 0) {
      this.calcDuration(end);
    } else if (diffEnd < 0) {
      this.setState({
        output: `${new Date(this.state.end).toLocaleString()}`,
      }),
        clearInterval(this.intervalID);
    }
  }

  render() {
    const { output } = this.state;
    return (
      <EventTimerWrapper>
        <ClockContainer>
          <ClockIcon />
        </ClockContainer>
        <EventTimerOutput>{output}</EventTimerOutput>
      </EventTimerWrapper>
    );
  }
}

EventTimer.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
};

export default EventTimer;
