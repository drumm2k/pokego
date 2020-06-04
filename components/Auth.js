import styled from 'styled-components';
import Link from 'next/link';

const LoginLink = styled.a`
  padding: 1rem;
  line-height: 1;
  margin: 0 2rem;
`;

function Auth() {
  return (
    <Link href="/login">
      <LoginLink>Войти</LoginLink>
    </Link>
  );
}

export default Auth;
