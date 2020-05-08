import { Component } from 'react';
import styled from 'styled-components';

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 1.5rem;
`;

const API = '/raids.json';

class raids extends Component {
  constructor(props) {
    super(props);
    this.state = { raidsData: [], isFetching: false, error: null };
  }

  componentDidMount() {
    this.setState({ isFetching: true });

    fetch(API)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ raidsData: data.tiers[0].raids, isFetching: false });
      })
      .catch((error) => this.setState({ error, isFetching: false }));
  }

  render() {
    const { raidsData, isFetching, error } = this.state;

    if (isFetching) {
      return (
        <div>
          <Title>Рейды</Title>
          <p>Загружаю данные...</p>
        </div>
      );
    }

    if (error !== null) {
      return (
        <div>
          <Title>Ивенты</Title>
          <p>Ошибка...</p>
        </div>
      );
    }

    return (
      <div>
        <Title>Рейды</Title>
        {raidsData.map((raids) => (
          <p key={raids.pokemon}>{raids.pokemon}</p>
        ))}
      </div>
    );
  }
}

export default raids;
