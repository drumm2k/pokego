import styled from 'styled-components';
import Link from 'next/link';

const LoginLink = styled.a`
  padding: 1rem;
  line-height: 1;
  margin: 0 2rem;
`;

export default class Auth extends React.Component {
  render() {
    return (
      <Link href="/login">
        <LoginLink>Login</LoginLink>
      </Link>
    );
  }
}
