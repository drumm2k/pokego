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
      status: 'init',
      output: ''
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  checkStatus = (start, end) => {
    const diffStart = Date.parse(start) - Date.parse(new Date());
    const diffEnd = Date.parse(end) - Date.parse(new Date());
    if (diffStart > 0) {
      this.setState({
        status: 'upcoming'
      });
    } else if (diffStart < 0 && diffEnd > 0) {
      this.setState({
        status: 'active'
      });
    } else if (diffEnd < 0) {
      this.setState({
        status: 'finished'
      });
    }
  };

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
    this.checkStatus(this.state.start, this.state.end);

    switch (this.state.status) {
      case 'active':
        this.calcDuration(this.state.end);
        break;

      case 'upcoming':
        this.calcDuration(this.state.start);
        break;

      case 'finished':
        this.setState({
          output: `Закончился`
        });
        clearInterval(this.intervalID);
        break;
    }
  }

  render() {
    return (
      <EventTimeWrapper>
        <ClockIcon />
        <EventTimer>{this.state.output}</EventTimer>
      </EventTimeWrapper>
    );
  }
}

export default Timer;
