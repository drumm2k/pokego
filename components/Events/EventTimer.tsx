import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ClockIcon from '../../assets/clock.svg';

interface EventTimerProps {
  starts: string;
  ends: string;
}

export function EventTimer({ starts, ends }: EventTimerProps) {
  const [output, setOutput] = useState('');

  const calcDuration = (date: string) => {
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
      setOutput(`${seconds}с`);
    } else if (days === 0 && hours === 0) {
      setOutput(`${minutes}м ${seconds}с`);
    } else if (days === 0) {
      setOutput(`${hours}ч ${minutes}м ${seconds}с`);
    } else {
      setOutput(`${days}д ${hours}ч ${minutes}м ${seconds}с`);
    }
  };

  const tick = (interval: any) => {
    const diffStart = Date.parse(starts) - Date.parse(new Date());
    const diffEnd = Date.parse(ends) - Date.parse(new Date());
    if (diffStart > 0) {
      calcDuration(starts);
    } else if (diffStart < 0 && diffEnd > 0) {
      calcDuration(ends);
    } else if (diffEnd < 0) {
      setOutput(`${new Date(ends).toLocaleString()}`);
      clearInterval(interval);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      tick(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <EventTimerWrapper>
      <ClockContainer>
        <ClockIcon />
      </ClockContainer>
      <EventTimerOutput>{output}</EventTimerOutput>
    </EventTimerWrapper>
  );
}

const EventTimerWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${(p) => p.theme.color.black};
`;

const ClockContainer = styled.div`
  height: 2rem;
  width: 2rem;
`;

const EventTimerOutput = styled.p`
  font-size: ${(p) => p.theme.font.size.xs};
  letter-spacing: 1px;
  font-weight: ${(p) => p.theme.font.weight.bold};
  font-variant-numeric: tabular-nums;
  margin-left: ${(p) => p.theme.spacing.s3};
`;
