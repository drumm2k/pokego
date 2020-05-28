import styled from 'styled-components';

const Title = styled.h2`
  color: #ff3163;
  margin-bottom: 1.5rem;
`;

export default class User extends React.Component {
  render() {
    return (
      <>
        <Title>Войти</Title>
      </>
    );
  }
}
