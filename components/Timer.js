import React, { Component } from 'react';
import styled from 'styled-components';
import ClockIcon from '../assets/clock.svg';

const EventTimeWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  font-size: 1.4rem;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier,
    monospace;
  color: #fcd768;
`;

const EventTimer = styled.p`
  margin-left: 1rem;
`;

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: this.props.start,
      end: this.props.end,
      status: '',
      output: ''
    };
  }

  componentDidMount() {
    this.tick();
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  calcDuration = date => {
    const milliseconds = Date.parse(date) - Date.parse(new Date());
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    let days = Math.floor(hours / 24);
    hours = hours % 24;

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (hours < 10) {
      hours = '0' + hours;
    }

    if (days === 0 && hours === 0 && minutes === 0) {
      this.setState({
        output: `${seconds}с`
      });
    } else if (days === 0 && hours === 0) {
      this.setState({
        output: `${minutes}м ${seconds}с`
      });
    } else if (days === 0) {
      this.setState({
        output: `${hours}ч ${minutes}м ${seconds}с`
      });
    } else {
      this.setState({
        output: `${days}д ${hours}ч ${minutes}м ${seconds}с`
      });
    }
  };

  tick() {
    const diffStart = Date.parse(this.state.start) - Date.parse(new Date());
    const diffEnd = Date.parse(this.state.end) - Date.parse(new Date());
    if (diffStart > 0) {
      this.setState({
        status: 'upcoming'
      }),
        this.calcDuration(this.state.start);
    } else if (diffStart < 0 && diffEnd > 0) {
      this.setState({
        status: 'active'
      }),
        this.calcDuration(this.state.end);
    } else if (diffEnd < 0) {
      this.setState({
        status: 'finished',
        output: `Закончился`
      }),
        clearInterval(this.intervalID);
    }
  }

  render() {
    return (
      <div>
        <div>{this.state.status}</div>
        <EventTimeWrapper>
          <ClockIcon />
          <EventTimer>{this.state.output}</EventTimer>
        </EventTimeWrapper>
      </div>
    );
  }
}

export default Timer;
