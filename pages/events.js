import React, { Component } from 'react';
import styled from 'styled-components';
import Event from '../components/Event';

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 1.5rem;
`;

const API = '/static/events.json';

class events extends Component {
  constructor(props) {
    super(props);
    this.state = { eventsData: [], isFetching: false, error: null };
  }

  componentDidMount() {
    this.setState({ isFetching: true });

    fetch(API)
      .then(response => response.json())
      .then(data => {
        this.setState({ eventsData: data.events, isFetching: false });
      })
      .catch(error => this.setState({ error, isFetching: false }));
  }

  render() {
    const { eventsData, isFetching } = this.state;

    if (isFetching) {
      return (
        <div>
          <Title>Ивенты</Title>
          <p>Загружаю данные...</p>
        </div>
      );
    }

    return (
      <div>
        <Title>Ивенты</Title>
        {eventsData.map(event => (
          <Event
            key={event.id}
            name={event.name}
            desc={event.desc}
            start={event.start}
            end={event.end}
            img={event.img}
          />
        ))}
      </div>
    );
  }
}

export default events;
